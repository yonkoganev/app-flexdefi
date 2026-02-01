import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { blue, grey } from "@mui/material/colors";
import { cardColor } from "@/constants/colors";

const faqs = [
  {
    id: 1,
    question: "What is FLEX in simple terms?",
    answer:
      "FLEX is a crypto protocol built around long-term commitment. Instead of just holding tokens and waiting for price movement, FLEX allows you to lock tokens for time and earn rewards based on how strong and how long your commitment is. There is no company, no admin, and no one controlling the system after launch — everything runs automatically and transparently by smart contracts.",
  },
  {
    id: 2,
    question: "How does staking work in FLEX?",
    answer:
      "When you stake FLEX, your tokens are burned and turned into a time-based commitment called a stake. You decide how much FLEX to lock and for how many days. Longer and stronger commitments earn more rewards. When your stake ends, FLEX is minted back to you together with any rewards you earned during the staking period.",
  },
  {
    id: 3,
    question: "What rewards can I earn from staking?",
    answer:
      "Stakers earn two types of rewards. First, you earn newly issued FLEX tokens through protocol inflation. Second, you may also earn USDT rewards when external USDT is allocated to the protocol. Both FLEX and USDT rewards are distributed proportionally based on your staking shares and how long your stake is active.",
  },
  {
    id: 4,
    question: "What makes longer stakes more powerful?",
    answer:
      "FLEX strongly favors long-term commitment. Longer stakes receive more staking shares, which means a larger portion of daily rewards. The bonus is non-linear, so each additional year adds more weight than the previous one. This means a single long stake can earn significantly more than multiple short stakes with the same amount of FLEX.",
  },
  {
    id: 5,
    question: "What is the difference between revocable and irrevocable stakes?",
    answer:
      "Revocable stakes give you flexibility. You can end them early or withdraw rewards while they are active, but doing so comes with penalties. Irrevocable stakes are fully locked until maturity and cannot withdraw rewards early, but in return they receive extra shares, meaning higher rewards over time.",
  },
  {
    id: 6,
    question: "What are Big Pay Days (BPDs)?",
    answer:
      "Big Pay Days are special USDT refund events funded by the auction phase. If you participated in auctions and claimed your FLEX as a stake, your address becomes eligible for Big Pay Days. During a BPD, selected addresses receive 100% of their total auction USDT contribution back. An address can receive multiple Big Pay Days as long as the auction phase is active and eligibility conditions are met.",
  },
  {
    id: 7,
    question: "Can I really receive more than one Big Pay Day?",
    answer:
      "Yes. Big Pay Days are not limited to one per address. As long as the auction phase is ongoing and your address remains eligible, you can receive multiple full USDT refunds across different Big Pay Day executions. Each selection is random and independent, which means long-term participants have repeated chances.",
  },
  {
    id: 8,
    question: "Is it possible to lose money in FLEX?",
    answer:
      "Yes. FLEX does not guarantee profits. Ending a revocable stake early can result in heavy penalties, and rewards depend on protocol participation, inflation, and external USDT contributions. FLEX is designed to reward patience and commitment, not short-term behavior.",
  },
  {
    id: 9,
    question: "Do I have to claim auction FLEX immediately?",
    answer:
      "No. Auction FLEX can be claimed on any day after the auction, giving you flexibility to decide when and how to claim. However, all auction FLEX must be claimed before the final deadline. When claiming, you must choose between liquid FLEX or staking it, and that choice permanently affects Big Pay Day eligibility.",
  },
  {
    id: 10,
    question: "Who controls FLEX after launch?",
    answer:
      "No one. After deployment and initialization, FLEX runs entirely by immutable smart contracts. There are no admin keys, no governance votes, and no ability to change the rules. Every participant plays by the same permanent rules for the lifetime of the protocol.",
  },
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <Box sx={{ width: { lg: '70%' } }}>
      {faqs.map((faq) => (
        <Accordion
          key={faq.id}
          expanded={expanded === faq.id}
          onChange={handleChange(faq.id)}
          disableGutters
          elevation={0}
          sx={{
            mb: 2,
            borderRadius: 3,
            backgroundColor: cardColor,
            "&:before": { display: "none" },
            "&:first-of-type": {
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            },
            "&:last-of-type": {
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            },
            "&.Mui-expanded": {
              margin: "0 0 16px 0",
              borderRadius: 3,
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              expanded === faq.id ? (
                <RemoveIcon sx={{ color: blue[400] }} />
              ) : (
                <AddIcon sx={{ color: blue[400] }} />
              )
            }
            sx={{
              px: 3,
              py: 2,
              "& .MuiAccordionSummary-content": {
                m: 0,
              },
            }}
          >
            <Typography
              sx={{
                fontSize: 18,
                color: grey[50],
                fontWeight: 400,
                fontFamily: "Roboto Slab",
              }}
            >
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 2 }}>
            <Typography
              sx={{
                fontSize: 14,
                color: grey[300],
                fontFamily: "Roboto Slab",
              }}
            >
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQSection;
