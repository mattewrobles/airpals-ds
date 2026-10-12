import figma from '@figma/code-connect'
import { Breadcrumbs } from '../src/lib/Breadcrumbs'

figma.connect(Breadcrumbs, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=625-2136', {
  props: {
    style: figma.enum('Style', { '2': 'chevron', '3': 'slash', '4': 'arrow' }),
  },
  example: ({ style }) => (
    <Breadcrumbs
      style={style}
      items={[{ label: 'Home', href: '/' }, { label: 'Shipments', href: '/shipments' }, { label: 'Current' }]}
    />
  ),
})
