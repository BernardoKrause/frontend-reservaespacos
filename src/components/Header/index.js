import { Link } from 'react-router-dom';
import prefeituraLogo from '../../images/prefeitura-logo.png'
import styled from 'styled-components';

const HeaderContainer = styled.div`
    display: flex;
    color: #004666;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 9;

    @media (max-width: 768px) {
        justify-content: center;
    }
`

const Logo = styled.img`
  max-width: 16vw;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.h1`

  @media (max-width: 768px) {
    font-size: 6vw; 
  }
`;



function Header() {
    return (
        <HeaderContainer>
            <Link to="/"><Logo src={prefeituraLogo} alt='logo' /></Link>
            <Title>Reserva de espaços esportivos</Title>
        </HeaderContainer>
    );
}
 
export default Header;