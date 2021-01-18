const Hamburger = ({active}: any) => {
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
