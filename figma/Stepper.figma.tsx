import figma from '@figma/code-connect'
import { Stepper } from '../src/lib/Stepper'

figma.connect(Stepper, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=742-64856', {
  props: {},
  example: () => (
    <Stepper value={1} min={0} max={99} onChange={() => {}} />
  ),
})
