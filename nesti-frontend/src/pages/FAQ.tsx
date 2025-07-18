import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const faqData = [
  {
    category: 'Orders & Payment',
    questions: [
      {
        id: 'order-1',
        question: 'How do I place an order?',
        answer: 'To place an order, browse our products, add items to your cart, and proceed to checkout. You\'ll need to provide shipping information and payment details to complete your purchase.'
      },
      {
        id: 'order-2',
        question: 'What payment methods do you accept?',
        answer: 'We accept various payment methods including credit cards (Visa, MasterCard), bank transfers, and popular e-wallets like OVO, GoPay, and DANA.'
      },
      {
        id: 'order-3',
        question: 'Can I modify or cancel my order?',
        answer: 'You can modify or cancel your order within 1 hour of placing it. After that, please contact our customer service team for assistance.'
      },
      {
        id: 'order-4',
        question: 'How do I track my order?',
        answer: 'Once your order is shipped, you\'ll receive a tracking number via email. You can also check your order status in the "Order History" section of your account.'
      }
    ]
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        id: 'shipping-1',
        question: 'How long does shipping take?',
        answer: 'Standard shipping takes 2-5 business days within Jakarta and 3-7 business days for other cities in Indonesia. Express shipping is available for faster delivery.'
      },
      {
        id: 'shipping-2',
        question: 'What are the shipping costs?',
        answer: 'Shipping costs vary based on location and package weight. Free shipping is available for orders over IDR 500,000 within Jakarta.'
      },
      {
        id: 'shipping-3',
        question: 'Do you ship internationally?',
        answer: 'Currently, we only ship within Indonesia. We\'re working on expanding our shipping services to other countries in the future.'
      },
      {
        id: 'shipping-4',
        question: 'What if my package is damaged or lost?',
        answer: 'If your package arrives damaged or is lost during shipping, please contact us immediately. We\'ll investigate the issue and provide a replacement or full refund.'
      }
    ]
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        id: 'return-1',
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for most items. Products must be in original condition with all tags and packaging. Some items like electronics may have different return periods.'
      },
      {
        id: 'return-2',
        question: 'How do I return an item?',
        answer: 'To return an item, go to your Order History, select the order, and click "Return Item". Follow the instructions to print a return label and ship the item back to us.'
      },
      {
        id: 'return-3',
        question: 'When will I get my refund?',
        answer: 'Refunds are processed within 5-7 business days after we receive your returned item. The refund will be credited to your original payment method.'
      },
      {
        id: 'return-4',
        question: 'Who pays for return shipping?',
        answer: 'For defective or wrong items, we cover return shipping costs. For other returns, customers are responsible for return shipping fees.'
      }
    ]
  },
  {
    category: 'Account & Security',
    questions: [
      {
        id: 'account-1',
        question: 'How do I create an account?',
        answer: 'Click "Register" at the top of the page, fill in your details including name, email, and password. You\'ll receive a confirmation email to activate your account.'
      },
      {
        id: 'account-2',
        question: 'I forgot my password. What should I do?',
        answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you instructions to reset your password.'
      },
      {
        id: 'account-3',
        question: 'How do I update my account information?',
        answer: 'Log in to your account and go to "Profile" section where you can update your personal information, shipping addresses, and preferences.'
      },
      {
        id: 'account-4',
        question: 'Is my personal information secure?',
        answer: 'Yes, we use industry-standard encryption and security measures to protect your personal and payment information. We never share your data with third parties without your consent.'
      }
    ]
  },
  {
    category: 'Products & Stock',
    questions: [
      {
        id: 'product-1',
        question: 'How do I know if an item is in stock?',
        answer: 'Stock availability is shown on each product page. If an item is out of stock, you can sign up for notifications to be alerted when it\'s back in stock.'
      },
      {
        id: 'product-2',
        question: 'Are your product photos accurate?',
        answer: 'We strive to show accurate product photos. However, colors may vary slightly due to monitor settings. If you\'re not satisfied with your purchase, our return policy applies.'
      },
      {
        id: 'product-3',
        question: 'Do you offer product warranties?',
        answer: 'Yes, electronic items come with manufacturer warranties. The warranty period varies by product and is clearly stated on the product page.'
      },
      {
        id: 'product-4',
        question: 'Can I request a product that\'s not available?',
        answer: 'Yes! Contact our customer service team with your product request. We\'ll do our best to source it for you or suggest similar alternatives.'
      }
    ]
  }
];

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFAQ, setFilteredFAQ] = useState(faqData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredFAQ(faqData);
      return;
    }

    const filtered = faqData.map(category => ({
      ...category,
      questions: category.questions.filter(
        faq =>
          faq.question.toLowerCase().includes(query.toLowerCase()) ||
          faq.answer.toLowerCase().includes(query.toLowerCase())
      )
    })).filter(category => category.questions.length > 0);
    
    setFilteredFAQ(filtered);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about our services
        </p>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* FAQ Categories */}
      <div className="space-y-8">
        {filteredFAQ.map((category) => (
          <Card key={category.category}>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFAQ.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              We couldn't find any FAQs matching your search. Try different keywords or browse our categories above.
            </p>
            <p className="text-sm text-muted-foreground">
              Still have questions? <a href="/contact" className="text-primary hover:underline">Contact our support team</a>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};