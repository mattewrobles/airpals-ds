import figma from '@figma/code-connect'
import { Pagination } from '../src/lib/Pagination'

figma.connect(Pagination, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=625-3520', {
  props: {
    style: figma.enum('Style', { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 }),
  },
  example: ({ style }) => (
    <Pagination style={style} total={100} page={1} pageSize={10} onChange={() => {}} />
  ),
})
