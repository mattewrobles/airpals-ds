import figma from '@figma/code-connect'
import { Tag } from '../src/lib/Tag'

figma.connect(Tag, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=625-4040', {
  props: {},
  example: () => (
    <Tag>Label</Tag>
  ),
})
