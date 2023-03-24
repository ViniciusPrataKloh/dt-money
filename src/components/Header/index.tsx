import { HeaderContainer, HeaderContent, TransactionButton } from "./styles";

import logo from "../../assets/Logo.svg";

export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logo} alt="Logo do DT Money" />

                <TransactionButton>Nova transação</TransactionButton>
            </HeaderContent>
        </HeaderContainer>
    )
}