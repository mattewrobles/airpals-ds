import figma from '@figma/code-connect'
import { Avatar } from '../src/lib/Avatar'

figma.connect(Avatar, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=688-1424', {
  props: {
    size:    figma.enum('Size', { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
    badge:   figma.enum('Badge', { ON: true, OFF: false }),
    variant: figma.enum('Variant', { Image: 'image', Initials: 'initials' }),
  },
  example: ({ size, badge }) => (
    <Avatar size={size} badge={badge} src="/avatar.jpg" />
  ),
})
