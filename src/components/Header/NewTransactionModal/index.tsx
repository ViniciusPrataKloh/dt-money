import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { CloseButton, Content, Overlay, TransactionTypeButton, TransactionTypeContainer } from "./styles";

export function NewTransactionModal() {
    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form action="">
                    <input type="text" placeholder="Descrição" id="description" required autoFocus />
                    <input type="text" placeholder="Preço" id="price" required />
                    <input type="text" placeholder="Categoria" id="category" required />

                    <TransactionTypeContainer>
                        <TransactionTypeButton value="income" variant="income">
                            <ArrowCircleUp size={24} />
                            <span>Entrada</span>
                        </TransactionTypeButton>

                        <TransactionTypeButton value="outcome" variant="outcome">
                            <ArrowCircleDown size={24} />
                            <span>Saída</span>
                        </TransactionTypeButton>
                    </TransactionTypeContainer>

                    <button type="submit">
                        Cadastrar
                    </button>
                </form>

            </Content>
        </Dialog.Portal>
    );
}