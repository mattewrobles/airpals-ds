import figma from '@figma/code-connect'
import { ButtonDouble } from '../src/lib/ButtonDouble'

figma.connect(ButtonDouble, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=741-40277', {
  props: {
    size: figma.enum('Sizes', { Small: 'sm', Large: 'lg' }),
  },
  example: ({ size }) => (
    <ButtonDouble
      size={size}
      primaryLabel="Primary Action"
      secondaryLabel="Secondary"
      onPrimary={() => {}}
      onSecondary={() => {}}
    />
  ),
})
