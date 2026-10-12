import figma from '@figma/code-connect'
import { Sidebar } from '../src/lib/Sidebar'

figma.connect(Sidebar, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=742-64604', {
  props: {
    collapsed: figma.enum('Collapsed', { True: true, False: false }),
  },
  example: ({ collapsed }) => (
    <Sidebar collapsed={collapsed} items={[{ label: 'Dashboard', href: '/' }]} />
  ),
})
