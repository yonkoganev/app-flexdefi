'use client';
import { useState } from 'react';
import { modal } from '@/context';
import { useAccount } from 'wagmi';
import { Button, lighten } from '@mui/material';
import { grey } from '@mui/material/colors';
import WalletModal from './Modals/WalletModal';
import { borderColor, cardColor } from '@/constants/colors';

export default function WalletConnectButton({ fullwidth }) {
  const { address, isConnected } = useAccount();
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  const handleClick = () => {
    if (isConnected) {
      setWalletModalOpen(true);
    } else {
      modal.open({ view: "Connect", namespace: "eip155", chainId: 'eip155:97'  });
    }
  };

  return (
    <>
      <Button
        fullWidth={fullwidth}
        onClick={handleClick}
        sx={{
          px: 2,
          border: 1,
          height: 37,
          fontSize: 14,
          fontWeight: 550,
          color: grey[50],
          borderRadius: 1,
          textTransform: 'none',
          background: cardColor,
          borderColor: borderColor,
          ':hover': { background: lighten(cardColor, 0.1) }
        }}
      >
        {isConnected ? shortAddress : 'Connect Wallet'}
      </Button>
      <WalletModal open={walletModalOpen} setOpen={setWalletModalOpen} />
    </>
  );
}
