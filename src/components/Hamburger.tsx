import {FC} from 'react'

const Hamburger: FC<{active: boolean}> = ({active}) => {
  return (
    <div className={`humberger-menu ion-ios-menu ${active && 'open'}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default Hamburger
