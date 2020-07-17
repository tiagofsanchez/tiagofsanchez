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
      <Img fluid={marta} sx={{height: `350px`}} />
      <KidsContainer>
        <Img fluid={diogo} />
        <Img fluid={monica} />
      </KidsContainer>
    </FamilyPhotContainer>
  );
};

export default FamilyPhoto;
