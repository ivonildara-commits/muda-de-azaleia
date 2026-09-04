import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Como funciona o link de pagamento Stripe?',
    answer:
      'Ao clicar em "Comprar Agora", você é redirecionado para a página oficial do Stripe Checkout do produto selecionado. Lá você pode inserir seu endereço de entrega e pagar com cartão de crédito, débito ou métodos aceitos pela plataforma com total segurança criptografada.',
  },
  {
    question: 'Qual o tamanho e estado em que as mudas são enviadas?',
    answer:
      'As mudas têm em média 20 a 35 cm de altura, com raízes completamente formadas e enraizadas no saquinho/tubete de cultivo com substrato úmido. Muitas já seguem com botões florais formados ou prestes a abrir.',
  },
  {
    question: 'A planta resiste ao transporte pelos Correios ou transportadora?',
    answer:
      'Sim! Aplicamos hidrogel retentor de umidade no torrão radicular e embalamos cada muda em tubos/caixas resistentes e perfuradas com espaçadores de impacto para que as hastes e folhas permaneçam intactas.',
  },
  {
    question: 'O que devo fazer assim que receber a minha azaleia?',
    answer:
      'Assim que a caixa chegar, abra imediatamente, hidrate o torrão com água fresca na sombra e deixe a planta descansar por 24 horas em local arejado e protegido do sol forte antes do transplante definitivo.',
  },
  {
    question: 'Posso comprar mudas de cores diferentes?',
    answer:
      'Com certeza! Você pode clicar em cada uma das variedades do catálogo para abrir o checkout específico de cada flor ou adicionar suas cores preferidas à sacola para organizar seu pedido.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#fdfaf6] border-t border-[#e5e1d8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#5a6b5a] border border-[#e5e1d8] bg-[#fcf8f2] px-3.5 py-1 rounded-full">
            Dúvidas & Esclarecimentos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2d3a2f]">
            Perguntas Frequentes
          </h2>
          <p className="text-[#5a6b5a] text-xs sm:text-sm italic">
            Tudo o que você precisa saber sobre pedidos, expedição e cultivo das mudas
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                id={`faq-item-${idx}`}
                className="bg-[#fcf8f2] border border-[#e5e1d8] hover:border-[#2d3a2f] transition-colors"
              >
                <button
                  type="button"
                  id={`btn-faq-toggle-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-[#2d3a2f] hover:text-[#5a6b5a] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3 text-sm sm:text-base">
                    <HelpCircle className="w-4 h-4 text-[#5a6b5a] shrink-0" />
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#5a6b5a] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#2d3a2f]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5a6b5a] italic leading-relaxed border-t border-[#e5e1d8] animate-in fade-in duration-200"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
