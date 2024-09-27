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
`

function Header() {
    return (
        <HeaderContainer>
            <Link to="/"><img src={prefeituraLogo} alt='logo'></img></Link>
            <h1>Reserva de espaços esportivos</h1>
        </HeaderContainer>
    );
}
 
export default Header;