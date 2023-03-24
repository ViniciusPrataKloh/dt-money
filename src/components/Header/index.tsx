import * as Dialog from "@radix-ui/react-dialog";
import { HeaderContainer, HeaderContent, TransactionButton } from "./styles";

import logo from "../../assets/Logo.svg";
import { NewTransactionModal } from "./NewTransactionModal";

export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logo} alt="Logo do DT Money" />

                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <TransactionButton>Nova transação</TransactionButton>
                    </Dialog.Trigger>

                    <NewTransactionModal />

                </Dialog.Root>

            </HeaderContent>
        </HeaderContainer>
    )
}