import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import logo from '../assets/img/AlphaBlack.png'
import Center from "./Center";

export default function Header (){

  const StyledHeader = styled.header `
    background-color: #254441;
  `
  const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
  `
  const StyledNav = styled.nav`
    display: flex;
    gap: 15px;
  `
  const NavLink = styled(Link) `
    color: #fff;
    text-decoration: none;
  `

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Link href={'/'}>
            <Image src={logo} alt="logo" width={30} height={30} />
          </Link>
          <StyledNav>
            <NavLink href="/" >Home</NavLink>
            <NavLink href="/products" >All products</NavLink>
            <NavLink href="/categories" >Categories</NavLink>
            <NavLink href="/accounts" >Accounts</NavLink>
            <NavLink href="/cart" >Cart (0)</NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  )
}
