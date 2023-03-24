import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { CloseButton, Content, Overlay } from "./styles";

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

                    {/* <div>
                        <button>
                            <ArrowCircleUp />
                            <span>Entrada</span>
                        </button>
                        <button>
                            <ArrowCircleDown />
                            <span>Saída</span>
                        </button>
                    </div> */}

                    <button type="submit">
                        Cadastrar
                    </button>
                </form>

            </Content>
        </Dialog.Portal>
    );
}