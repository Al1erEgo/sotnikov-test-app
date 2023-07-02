import { Card } from 'antd'
import { NavLink } from 'react-router-dom'
import { styled } from 'styled-components'

export const AlbumCard = styled(Card)<{ favourite: string; isEdit?: string }>`
  max-width: 300px;
  width: 300px;
  min-height: 140px;
  height: ${props => (props.isEdit ? '250px' : '140px')};
  border-color: ${props => (props.favourite ? '#1677ff' : '#e7e7e7')};
`

export const AlbumCardHeaderLink = styled(NavLink)`
  font-size: 1.3em;
  color: black;
`
