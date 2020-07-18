/** @jsx jsx */
import { jsx } from "theme-ui";
import Img from "gatsby-image";
import styled from "@emotion/styled";
import { useMartaPhoto } from "../hooks/useMartaPhoto";
import { useMonicaPhoto } from "../hooks/useMonicaPhoto";
import { useDiogoPhoto } from "../hooks/useDiogoPhoto";

const FamilyPhotContainer = styled.div`
  display: grid;
  grid-gap: 10px;
`;

const MartaContainer = styled.div`
  height: 350px;
  display: grid;
  @media (max-width: 720px ) { 
      height: 200px
  }
`;

const KidsContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, auto);
  height: auto;
`;

const FamilyPhoto = () => {
  const marta = useMartaPhoto();
  const monica = useMonicaPhoto();
  const diogo = useDiogoPhoto();
  return (
    <FamilyPhotContainer>
      <MartaContainer>
        <Img
          fluid={marta}
          aria-label="Picture of Marta"
          alt="Picture of Marta"
          objectFit="cover"
        />
      </MartaContainer>
      <KidsContainer>
        <Img
          fluid={diogo}
          aria-label="Picture of Diogo"
          alt="Picture of Diogo"
        />
        <Img
          fluid={monica}
          aria-label="Picture of Monica"
          alt="Picture of Monica"
        />
      </KidsContainer>
    </FamilyPhotContainer>
  );
};

export default FamilyPhoto;
