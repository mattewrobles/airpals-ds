import figma from '@figma/code-connect'
import { SplitButton } from '../src/lib/SplitButton'

figma.connect(SplitButton, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=625-1704', {
  props: {
    size: figma.enum('Size', {
      'Extra Small': 'xs', Small: 'sm', Medium: 'md', Large: 'lg',
    }),
    type: figma.enum('Type', {
      Primary: 'primary', Secondary: 'secondary', Info: 'info',
      Success: 'success', Warning: 'warning', Danger: 'danger',
    }),
  },
  example: ({ size, type }) => (
    <SplitButton size={size} type={type} label="Action" options={[{ label: 'Option', value: 'opt' }]} />
  ),
})
