import figma from '@figma/code-connect'
import { Badge } from '../src/lib/Badge'

figma.connect(Badge, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=625-2011', {
  props: {
    color: figma.enum('Color', {
      Primary:   'Primary',
      Secondary: 'Secondary',
      Dark:      'Dark',
      Gray:      'Gray',
      Light:     'Light',
      Warning:   'Warning',
      Danger:    'Danger',
      Success:   'Success',
      Info:      'Info',
    }),
    state: figma.enum('State', {
      Fill:       'Fill',
      Outline:    'Outline',
      'Duo Tone': 'Duo Tone',
    }),
    round: figma.enum('Round', { On: true, Off: false }),
    dot:   figma.boolean('Dot#681:13'),
    text:  figma.string('Text#912:0'),
  },
  example: ({ color, state, round, dot, text }) => (
    <Badge color={color} state={state} round={round} dot={dot}>{text}</Badge>
  ),
})
