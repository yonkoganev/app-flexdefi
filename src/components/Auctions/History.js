import Image from "next/image";
import {
  Box,
  Typography,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { formatEther } from "viem";

import { borderColor, cardColor } from "@/constants/colors";
import { useGetAllAuctionStats } from "../web3/hooks/useGetAllAuctionStats";

/* =======================
   Table configuration
======================= */

const HEADER_COLUMNS = [
  "Day",
  "Generated FLEX",
  "Total Donation",
  "Donors",
  "Ratio",
];

const BODY_COLUMNS = [
  {
    key: "day",
    render: ({ day }) => day,
  },
  {
    key: "generatedFlex",
    icon: "/flexsquarelogo.png",
    render: ({ stats }) =>
      Number(formatEther(stats[0])).toLocaleString("en-us", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }),
  },
  {
    key: "totalDonation",
    icon: "/assets/usdtlogo.png",
    render: ({ stats }) =>
      Number(formatEther(stats[1])).toLocaleString("en-us", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }),
  },
  {
    key: "donors",
    render: ({ stats }) => stats[2].toString(),
  },
  {
    key: "ratio",
    icon: "/flexsquarelogo.png",
    render: ({ stats }) => {
      const generated = Number(formatEther(stats[0]));
      const donated = Number(formatEther(stats[1]));

      if (donated === 0) return "0.00";

      return (generated / donated).toLocaleString("en-us", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    },
  },
];

/* =======================
   Component
======================= */

export default function History() {
  const { allStats, isLoading, isError } = useGetAllAuctionStats();

  if (isLoading) {
    return (
      <Typography color={grey[400]}>
        Loading auction history…
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography color="error">
        Failed to load auction history
      </Typography>
    );
  }

  return (
    <Grid container justifyContent="center" width="100%">
      <Grid
        size={{ lg: 8, md: 6, sm: 12, xs: 12 }}
        sx={{
          p: 2,
          background: cardColor,
          border: 1,
          borderColor,
          borderRadius: 1,
        }}
      >
        <Typography
          color={grey[50]}
          fontSize={28}
          fontWeight={600}
          mb={2}
        >
          Auction history
        </Typography>

        <TableContainer
          sx={{
            border: 1,
            borderColor,
            borderRadius: 1,
            maxHeight: 400,
            overflow: "auto",
          }}
        >
          <Table stickyHeader>
            {/* ---------- HEADER ---------- */}
            <TableHead>
              <TableRow>
                {HEADER_COLUMNS.map((label) => (
                  <TableCell
                    key={label}
                    sx={{
                      px: 3,
                      color: grey[300],
                      fontWeight: 600,
                      borderColor,
                      whiteSpace: "nowrap",
                      background: cardColor,
                    }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* ---------- BODY ---------- */}
            <TableBody>
              {allStats.map((row) => (
                <TableRow key={row.day}>
                  {BODY_COLUMNS.map((col) => (
                    <TableCell
                      key={col.key}
                      sx={{ color: grey[50], borderColor, px: 3 }}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        <span>{col.render(row)}</span>
                        {col.icon && (
                          <Image
                            src={col.icon}
                            alt={col.key}
                            width={20}
                            height={20}
                            style={{ borderRadius: 50 }}
                          />
                        )}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
