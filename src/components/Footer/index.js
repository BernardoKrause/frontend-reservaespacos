import prefeituraLogo from '../../images/prefeitura-logo.png'
import secuteLogo from '../../images/secute-logo.png'
import styled from 'styled-components';

const FooterContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #004666;
    width: 100%;
    color: #fff;
    padding: 2vh 0;
    @media (max-width: 768px) {
        align-items: start;
        flex-direction: column;
        gap: 2vh;
    }
`

const FooterPrefeituraLogo =  styled.img`
    border-radius: 40px;
    @media (max-width: 768px) {
        margin-left: 4vw;
    }
`

const FooterPrefeituraInfo = styled.div`
    text-align: left;
    @media (max-width: 768px) {
        margin-left: 4vw;
    }
`

const SECUTEContainer = styled.div`
    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        width: 100%;
    }
`

const FooterSECUTELogo = styled.img `
    border-radius: 12px;
    @media (max-width: 768px) {
        display: none;
    }
`

const SECUTE = styled.p`
    align-self: center;
`

function Footer() {
    return (
        <FooterContainer>
            <div>
                <FooterPrefeituraLogo src={prefeituraLogo} alt='Prefeitura Logo'/>
            </div>
            <FooterPrefeituraInfo>
                Parque Getúlio Vargas, 01 - Centro, Alegre - ES, 29500-000
                <br/>
                telefone: (28) 3552-1213
            </FooterPrefeituraInfo>
            <SECUTEContainer>
                <FooterSECUTELogo src={secuteLogo} alt='SECUTE Logo'/>
                <SECUTE>Administrado por: Secretaria de Cultura e Esporte (SECUTE)</SECUTE>
            </SECUTEContainer>
        </FooterContainer>
    );
}
 
export default Footer;