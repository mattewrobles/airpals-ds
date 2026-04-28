// Prism Figma Plugin — Main thread code
// Handles push (tokens → Figma variables) and pull (Figma variables → tokens)

figma.showUI(__html__, { width: 400, height: 560, title: "Prism" });

figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
    case "PUSH":
      await pushTokens(msg.payload);
      break;
    case "PULL":
      await pullTokens();
      break;
    case "PING":
      figma.ui.postMessage({ type: "PONG" });
      break;
  }
};

// ─────────────────────────────────────────
// PUSH: tokens JSON → Figma Variables
// ─────────────────────────────────────────

async function pushTokens(tokensJson: TokensPayload) {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const existingVars = await figma.variables.getLocalVariablesAsync();

  // Create or find primitives collection
  let primitivesCollection = collections.find(c => c.name === "⊙ Primitives")
    ?? figma.variables.createVariableCollection("⊙ Primitives");

  // Create or find semantic collection
  let semanticCollection = collections.find(c => c.name === "🧩 Tokens")
    ?? figma.variables.createVariableCollection("🧩 Tokens");

  // Ensure Light/Dark modes on semantic collection
  const lightMode = semanticCollection.modes[0];
  lightMode.name = "Light";
  let darkMode = semanticCollection.modes.find(m => m.name === "Dark")
    ?? null;
  if (!darkMode) {
    const darkModeId = semanticCollection.addMode("Dark");
    darkMode = semanticCollection.modes.find(m => m.modeId === darkModeId)!;
  }

  const varMap: Record<string, Variable> = {};

  // Push primitives
  for (const [key, token] of Object.entries(tokensJson.primitives ?? {})) {
    const existing = existingVars.find(v => v.name === key);
    const variable = existing ?? figma.variables.createVariable(
      key, primitivesCollection, tokenTypeToFigma(token.$type)
    );
    const value = resolveRawValue(token.$value, token.$type);
    variable.setValueForMode(primitivesCollection.modes[0].modeId, value);
    varMap[key] = variable;
  }

  // Push semantic tokens (with aliases)
  for (const [key, token] of Object.entries(tokensJson.semantic ?? {})) {
    const existing = existingVars.find(v => v.name === key);
    const variable = existing ?? figma.variables.createVariable(
      key, semanticCollection, tokenTypeToFigma(token.$type)
    );

    // Light value
    const lightVal = token.$value;
    if (isAlias(lightVal)) {
      const target = varMap[lightVal.replace(/[{}]/g, "")];
      if (target) variable.setValueForMode(lightMode.modeId, { type: "VARIABLE_ALIAS", id: target.id });
    } else {
      variable.setValueForMode(lightMode.modeId, resolveRawValue(lightVal, token.$type));
    }

    // Dark value
    if (token.$modes?.dark && darkMode) {
      const darkVal = token.$modes.dark;
      if (isAlias(darkVal)) {
        const target = varMap[darkVal.replace(/[{}]/g, "")];
        if (target) variable.setValueForMode(darkMode.modeId, { type: "VARIABLE_ALIAS", id: target.id });
      } else {
        variable.setValueForMode(darkMode.modeId, resolveRawValue(darkVal, token.$type));
      }
    }
  }

  figma.ui.postMessage({ type: "PUSH_DONE", count: Object.keys(tokensJson.primitives ?? {}).length + Object.keys(tokensJson.semantic ?? {}).length });
}

// ─────────────────────────────────────────
// PULL: Figma Variables → tokens JSON
// ─────────────────────────────────────────

async function pullTokens() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const vars = await figma.variables.getLocalVariablesAsync();

  const output: Record<string, any> = {};

  for (const v of vars) {
    const collection = collections.find(c => c.id === v.variableCollectionId);
    if (!collection) continue;

    const modeValues: Record<string, any> = {};
    for (const mode of collection.modes) {
      const raw = v.valuesByMode[mode.modeId];
      if (raw && typeof raw === "object" && "type" in raw && raw.type === "VARIABLE_ALIAS") {
        const alias = vars.find(a => a.id === (raw as VariableAlias).id);
        modeValues[mode.name] = `{${alias?.name ?? "unknown"}}`;
      } else {
        modeValues[mode.name] = figmaValueToToken(raw, v.resolvedType);
      }
    }

    output[v.name] = {
      $type: figmaTypeToToken(v.resolvedType),
      $value: modeValues[collection.modes[0].name],
      ...(Object.keys(modeValues).length > 1 ? { $modes: modeValues } : {})
    };
  }

  figma.ui.postMessage({ type: "PULL_DONE", tokens: output });
}

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────

function isAlias(val: string): boolean {
  return typeof val === "string" && val.startsWith("{") && val.endsWith("}");
}

function tokenTypeToFigma(type: string): VariableResolvedDataType {
  if (type === "color") return "COLOR";
  if (type === "number" || type === "dimension") return "FLOAT";
  if (type === "boolean") return "BOOLEAN";
  return "STRING";
}

function figmaTypeToToken(type: VariableResolvedDataType): string {
  if (type === "COLOR") return "color";
  if (type === "FLOAT") return "number";
  if (type === "BOOLEAN") return "boolean";
  return "string";
}

function resolveRawValue(value: any, type: string): VariableValue {
  if (type === "color") {
    const hex = value as string;
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return { r, g, b, a: 1 };
  }
  if (type === "number" || type === "dimension") return parseFloat(value);
  if (type === "boolean") return Boolean(value);
  return String(value);
}

function figmaValueToToken(value: VariableValue, type: VariableResolvedDataType): any {
  if (type === "COLOR" && value && typeof value === "object" && "r" in value) {
    const { r, g, b } = value as RGBA;
    const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  return value;
}

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

interface TokenEntry {
  $type: string;
  $value: any;
  $modes?: Record<string, any>;
}

interface TokensPayload {
  primitives?: Record<string, TokenEntry>;
  semantic?: Record<string, TokenEntry>;
}
