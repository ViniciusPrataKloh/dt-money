import * as Dialog from "@radix-ui/react-dialog";
import { HeaderContainer, HeaderContent, TransactionButton } from "./styles";

import { useState } from "react";
import logo from "../../assets/Logo.svg";
import { NewTransactionModal } from "./NewTransactionModal";

export function Header() {
    const [open, setOpen] = useState<boolean>(false);

    function handleSetOpen(open: boolean) {
        setOpen(open);
    }

    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logo} alt="Logo do DT Money" />

                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Trigger asChild>
                        <TransactionButton>Nova transação</TransactionButton>
                    </Dialog.Trigger>

                    <NewTransactionModal handleSetOpen={handleSetOpen} />

                </Dialog.Root>

            </HeaderContent>
        </HeaderContainer>
    )
}