import Image from "next/image";
import styled from "styled-components";
import Center from "./Center";
import yonga from '../assets/img/pic.jpeg'

export default function Featured () {

  const Bg = styled.div`
    background-color: #254441;
    color: #fff;
    padding: 50px 0;
  `
  const Title = styled.h1`
    margin: 0;
    font-weight: normal;
  `

  const Desc = styled.p`
    color: #aaa;
  `

  const FeaturedWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  `

  const StyledImage = styled(Image)`
    max-width: 360px;
    max-height: 360px;
    object-fit: cover;
  `

  const Column = styled.div`
    display: flex;
    align-items: center;
  `
  return (
  <Bg>
    <Center>
      <FeaturedWrapper>
      <Column>
        <div>
          <Title>Pro Anywhere</Title>
          <Desc>
          know, the one that is going to catapult him or her out of the murky depths of
          obscurity and onto the highest planes of cultural rock stardom.
          The one that’s all love-at-first-sight with the Zeitgeist.
          The one that’s going to get them invited to all the right parties, metaphorical
          or otherwise. So naturally
          </Desc>
        </div>
      </Column>
        <Column>
          <StyledImage src={yonga} alt="product"></StyledImage>
        </Column>
      </FeaturedWrapper>
    </Center>
  </Bg>
  )
}
