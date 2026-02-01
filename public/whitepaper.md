## Technical Specification and Economic Design

**Publish date: 14.01.2026**    
**Official Website:** https://flexdefi.io   
**Network:** BNB Smart Chain **(BSC)**  
**Smart Contract Language:** Solidity   
**Chain ID:** 56 **(Mainnet)**      
**Compiler Version:** 0.8.31    

## 1. INTRODUCTION

This document constitutes the formal technical specification and constitutional description of the FLEX Protocol. It defines the rules, mechanisms, and constraints governing the creation, distribution, staking, and reward allocation of the FLEX token, as enforced exclusively by immutable smart contracts deployed on a public blockchain.

The FLEX Protocol is not a company, organization, legal entity, or service provider. It is a set of deterministic smart contracts that operate according to predefined logic without discretionary control, administrative privileges, or governance-based intervention after deployment.

This document is intended to describe what the protocol does, how it does it, and under which conditions it operates. It does not make claims regarding profitability, performance, or suitability for any individual participant.

### 1.1 Purpose of This Document

The purpose of this document is to provide a complete, precise, and reproducible description of the FLEX Protocol so that any technically competent reader can independently verify its behavior by inspecting the deployed smart contracts.

This document serves as a single source of truth for understanding the protocol’s mechanics, including but not limited to token issuance, staking behavior, reward distribution, penalties, and auxiliary mechanisms such as auctions and probabilistic redistribution events.

Nothing in this document should be interpreted as financial advice, an offer, or a solicitation. Participation in the FLEX Protocol is entirely voluntary and subject to the participant’s own assessment of risks.

### 1.2 Scope and Non-Guarantees

The FLEX Protocol enforces rules mechanically. It does not guarantee outcomes.

Specifically, the protocol does not guarantee:

- positive returns,

- preservation of purchasing power,

- availability of external rewards,

- uninterrupted blockchain operation,

- or continued usability of third-party infrastructure.

All calculations, distributions, and state transitions occur strictly according to on-chain logic. If an action is not permitted by the smart contracts, it cannot occur. Conversely, if an action is permitted, no external party can prevent it.

### 1.3 Risk Disclosures and User Responsibility

Cryptographic protocols operate in adversarial and uncertain environments. Participants interact with FLEX at their own risk and remain solely responsible for safeguarding their private keys, understanding transaction semantics, and complying with applicable laws and regulations.

The FLEX Protocol cannot reverse transactions, recover lost credentials, or intervene in user mistakes. Once deployed and activated, its behavior is final and irreversible.

Participants are strongly advised to understand the mechanics described in this document before interacting with the protocol.

### 1.4 On Immutability and Finality

The FLEX smart contracts are designed to be immutable. After deployment and initialization, no function exists to modify protocol parameters, alter reward logic, introduce administrative controls, or redirect token flows.

This immutability ensures that all participants operate under identical and permanent rules. However, it also implies that bugs, misconfigurations, or unforeseen interactions cannot be patched or corrected after deployment.

Participation in the FLEX Protocol therefore constitutes acceptance of both its guarantees and its limitations.

## 2. THE FLEX PROTOCOL

The FLEX Protocol is a blockchain-native system for time-bound token commitments and deterministic reward distribution. It is implemented entirely through immutable smart contracts and operates without custodial control, discretionary governance, or administrative intervention.

At its core, the protocol enables participants to convert liquid FLEX tokens into time-locked commitments, referred to as stakes, in exchange for participation in protocol issuance and externally supplied rewards. These commitments are enforced cryptographically and cannot be altered once created.

### 2.1 What FLEX Is and What It Is Not

FLEX is a fungible digital token (ERC-20) that exists solely as on-chain state governed by smart contract logic. It is not a share in a company, not a claim on assets, not a debt instrument, and not a promise of future value.

The FLEX Protocol does not pool user funds for discretionary use, does not lend or rehypothecate staked tokens, and does not employ leverage. Tokens committed to staking are burned at the moment of stake creation and re-minted only when the stake is ended according to the protocol’s rules.

The protocol does not require trust in any operator, foundation, or governing body after deployment. All outcomes are determined mechanically by the code.

### 2.2 Architectural Overview

The FLEX Protocol consists of a primary token contract that governs token supply, staking, reward accounting, and auxiliary mechanisms such as auctions and probabilistic redistribution events. These mechanisms are integrated at the contract level and do not rely on external coordination beyond explicitly defined oracle inputs.

State within the protocol evolves in discrete time units referred to as FLEX Days. All reward calculations, penalties, and issuance are indexed to these days, ensuring deterministic behavior regardless of transaction ordering within a day.

The protocol maintains global accounting variables that track total staked FLEX, total active staking shares, and a global share price. These variables are updated only through protocol-defined actions and are never modified arbitrarily.

### 2.3 Tokenized Commitments and Time-Bound Locking

When a participant creates a stake, they commit a specific quantity of FLEX tokens for a fixed number of FLEX Days. This commitment is absolute for the duration of the stake, subject only to the rules governing early termination and irrevocability.

The protocol does not represent stakes as transferable tokens by default. Instead, stakes exist as internal accounting objects with explicitly defined properties such as start day, final day, share allocation, and status flags.

This design ensures that staking commitments cannot be duplicated, fractionalized, or leveraged outside the protocol’s accounting model.

### 2.4 Distinction from Traditional Financial Instruments

Although FLEX staking may resemble traditional time-based instruments such as certificates of deposit or bonds, the protocol differs fundamentally in its enforcement and risk model.

Traditional instruments rely on legal contracts, custodians, and counterparties. FLEX relies exclusively on code execution and cryptographic verification. There is no issuer that can default, renegotiate terms, or alter payout schedules.

At the same time, FLEX does not provide legal protections, guarantees, or recourse mechanisms typical of regulated financial products. The protocol’s behavior is final, and participants bear full responsibility for their decisions.

### 2.5 Non-Custodial and Permissionless Design

At no point does the FLEX Protocol take custody of user assets in the traditional sense. Tokens committed to staking are destroyed and later recreated according to deterministic rules, rather than held in escrow or controlled by a third party.

Any externally owned account may interact with the protocol directly, subject only to the constraints enforced by the smart contracts. No registration, approval, or identity verification is required.

The protocol does not discriminate between participants based on geography, identity, or prior activity, except where explicitly required by mechanical rules such as minimum stake amounts or duration constraints.

### 2.6 Absence of Governance and Administrative Control

The FLEX Protocol does not implement on-chain governance, voting systems, or upgrade mechanisms. After initialization, no address retains special privileges to modify protocol behavior, pause execution, or redirect value flows.

This absence of governance is intentional. It ensures that all participants interact under the same permanent ruleset and that no minority or majority group can alter outcomes retroactively.

## 3. TIME, DAYS, AND SNAPSHOTS

All state transitions, reward calculations, and issuance within the FLEX Protocol are indexed to a discrete time abstraction referred to as the FLEX Day. This abstraction is fundamental to ensuring deterministic behavior, predictable reward allocation, and resistance to transaction ordering effects.

Rather than relying on block numbers or continuous timestamps for economic calculations, the protocol advances its internal state in whole-day increments derived from the blockchain timestamp and a fixed launch reference point.

### 3.1 Definition of FLEX Day

A FLEX Day is defined as a fixed-duration interval of blockchain time, measured in seconds. The duration of one FLEX Day is constant and defined as:

```text
SECONDS_IN_DAY = 86400 seconds
```

The FLEX Day counter begins at a predefined launch timestamp, referred to as LAUNCH_TIME. The current FLEX Day is computed as the integer division of elapsed time since launch by the duration of a FLEX Day:

```text
LAUNCH_TIME = 1769968800
```

```text
currentFlexDay = (block.timestamp - LAUNCH_TIME) / SECONDS_IN_DAY
```

If the current blockchain timestamp is earlier than LAUNCH_TIME, the FLEX Day is defined as zero.

This definition ensures that FLEX Day progression is monotonic, deterministic, and independent of transaction frequency.

### 3.2 Day Zero and Protocol Activation

FLEX Day 0 represents the initialization phase of the protocol. During this phase, no staking rewards accrue, no inflation is distributed, and no snapshot data is recorded.

The existence of Day 0 allows the protocol to be deployed and initialized prior to the activation of economic mechanics, ensuring that no participant can accrue rewards before the intended start of issuance and staking.

The first FLEX Day on which reward-relevant activity may occur is FLEX Day 1. Snapshot processing begins from FLEX Day 2 onward, as no valid staking or issuance state exists prior to that point.

### 3.3 Discrete-Time Accounting Rationale

Blockchain systems do not provide a natural notion of discrete economic periods. Transactions can occur at any time, in any order, and with arbitrary spacing.

If reward calculations were performed continuously or at the moment of each transaction, outcomes would depend on transaction ordering, block inclusion timing, and miner behavior. Such dependence would introduce nondeterminism and create opportunities for manipulation.

By constraining all economic calculations to discrete FLEX Days, the protocol ensures that:

- all participants within the same FLEX Day are treated equivalently,

- reward calculations are order-independent within a day,

- and economic outcomes can be reproduced off-chain given historical snapshots.

### 3.4 Snapshot Mechanism

To support discrete-time accounting, the FLEX Protocol records daily snapshots of critical global state. A snapshot captures the economic state of the protocol at a specific FLEX Day and serves as an immutable reference for reward calculations.

Each snapshot includes, at minimum:

- the total number of active staking shares,

- the number of shares scheduled to expire,

- the effective inflation divisor for that day,

- and the total USDT rewards allocated for that day.

```solidity
struct SnapShot {
    uint256 totalShares;
    uint256 inflationAmount;
    uint256 scheduledToEnd;
    uint256 usdtReward;
}
```

Snapshots are stored in a mapping indexed by FLEX Day, allowing any historical day to be referenced deterministically.

### 3.5 Snapshot Creation and Advancement

Snapshots are not created automatically on every block. Instead, snapshot creation is triggered lazily when a protocol interaction requires up-to-date accounting.

When a snapshot is required, the protocol advances its internal day counter from the last processed FLEX Day up to the current FLEX Day, creating intermediate snapshots as necessary. For each processed day, global values are offloaded into snapshot storage and adjusted according to scheduled stake expirations and penalties.

This approach avoids unnecessary computation during periods of inactivity while guaranteeing correctness whenever state-dependent calculations are performed.

### 3.6 Scheduled Share Expiration

When a stake is created, its associated shares are scheduled to expire on the stake’s final FLEX Day. The protocol records these scheduled expirations and incorporates them into snapshot processing.

For each FLEX Day processed, the snapshot mechanism subtracts shares scheduled to expire from the total active share count. This ensures that shares belonging to matured or ended stakes do not continue to receive rewards beyond their intended duration.

This scheduling mechanism allows the protocol to track share lifecycles without iterating over individual stakes.

### 3.7 Manual Snapshot Offloading

To further reduce gas costs during high-traffic periods, the protocol exposes a function that allows any externally owned account to process a single pending FLEX Day snapshot voluntarily.

This function performs the same snapshot logic as automatic advancement but limits processing to one day. It does not grant any privileges or influence over protocol behavior; it merely advances deterministic accounting that would otherwise occur later.

Because snapshot content is fully determined by prior state, manual snapshot processing cannot alter outcomes or favor specific participants.

### 3.8 Determinism and Reproducibility

The snapshot system guarantees that all reward calculations are reproducible from historical on-chain data. Given:

- the sequence of snapshots,

- stake parameters,

- and protocol constants,

- any third party can independently compute the rewards or penalties associated with a stake.

This property is essential for transparency, auditability, and trust minimization.

## 4. FLEX TOKEN SUPPLY

The FLEX token supply is governed entirely by on-chain logic and evolves over time according to deterministic rules. The protocol distinguishes between different notions of supply in order to accurately model economic reality and ensure correct reward distribution.

At no point does the protocol rely on discretionary minting, reserved allocations, or administrative control over supply.

### 4.1 Circulating Supply

The circulating supply of FLEX is defined as the total number of FLEX tokens that currently exist in liquid form and are held by externally owned accounts or contracts. This value is returned by the standard totalSupply() function of the FLEX token contract.

Circulating supply includes all FLEX that is freely transferable and excludes any FLEX that has been committed to staking and subsequently burned.

### 4.2 Staked FLEX and Token Burning

When a participant creates a stake, the specified amount of FLEX is immediately and irreversibly burned. Burned tokens are removed from the circulating supply and cease to exist for the duration of the stake.

The protocol does not escrow or lock tokens in a contract balance. Instead, staking is enforced by destruction and later recreation of tokens, ensuring that staked FLEX cannot be transferred, reused, or otherwise manipulated while committed.

When a stake is ended, FLEX tokens are re-minted to the staker according to the protocol’s rules, including any applicable rewards or penalties.

### 4.3 Allocated Supply

For the purposes of inflation and reward calculation, the FLEX Protocol defines a broader concept referred to as the allocated supply.

Allocated supply is the sum of:

- all circulating FLEX tokens, and

- all FLEX tokens that have been committed to active stakes.

Formally:

```text
allocatedSupply = circulatingSupply + totalStaked
```

where:

```text
circulatingSupply = totalSupply()
```

totalStaked is the aggregate amount of FLEX currently represented by active staking positions.

This definition ensures that inflation is calculated based on the total economic footprint of the protocol rather than only the liquid portion of supply.

### 4.4 Rationale for Using Allocated Supply

Using allocated supply as the inflation base prevents distortion between liquid holders and stakers. If inflation were calculated solely on circulating supply, stakers would be disproportionately diluted during periods of high staking participation.

By including staked FLEX in the inflation base, the protocol ensures that issuance reflects the total committed capital, while distribution remains restricted to active stakers.

This separation between issuance base and distribution eligibility is a core design principle of the FLEX Protocol.

### 4.5 Minting Rules

FLEX tokens may be minted only under the following conditions:

- as protocol issuance distributed to stakers,

- as rewards minted when a stake is ended,

- or as FLEX minted via the daily auction mechanism.

No other function exists to mint FLEX. In particular, there is no minting authority, emergency mint function, or upgrade hook that can introduce new supply arbitrarily.

All minting events are deterministic outcomes of user actions and protocol-defined schedules.

### 4.6 Supply Transparency

Because all minting and burning events occur on-chain and are recorded as standard ERC-20 events, the full supply history of FLEX can be reconstructed by any third party.

At any point in time, participants can verify:

- circulating supply via totalSupply(),

- total staked FLEX via global accounting variables,

- and allocated supply via the explicit formula defined above.

## 5. PROTOCOL ISSUANCE (INFLATION)

The FLEX Protocol introduces new FLEX tokens through a deterministic issuance mechanism encoded directly into its smart contracts. This mechanism is commonly referred to as inflation. It operates without governance input, discretion, or upgradeability and cannot be paused, accelerated, or modified after deployment.

The purpose of inflation is to reward participants who commit FLEX to staking and to distribute newly created supply proportionally according to objectively measurable, on-chain commitments.

At a high level, FLEX inflation starts very high and gradually becomes conservative. The protocol begins with approximately 2% inflation per FLEX Day and transitions linearly to approximately 2% inflation per year, where it remains permanently.

### 5.1 Inflation Schedule and Rate Evolution

Unlike protocols that apply a fixed annual inflation rate from inception, FLEX uses a decaying issuance schedule.

In the earliest days of the protocol, inflation is expressed as a daily percentage. Over a fixed transition period, the daily inflation rate decreases smoothly and linearly until it reaches a long-term equilibrium that corresponds to roughly 2% annual inflation.

All parameters governing this behavior are immutable constants:

```text
START_RATE = 2,000,000,000,000
END_RATE   = 5,427,000,000
RAMP_DAYS  = 148
RATE_SCALE = 1 × 10¹⁴
```

Interpreted correctly:

```text
START_RATE / RATE_SCALE ≈ 2.00% per FLEX Day
END_RATE / RATE_SCALE ≈ 0.005427% per FLEX Day, which compounds to ≈ 2.00% per year
RAMP_DAYS defines the number of FLEX Days over which this transition occurs
```

In practical terms, this means:

Each day during the ramp period issues slightly less FLEX than the previous day, until the protocol reaches its long-term issuance rate.

There are no jumps, step functions, or regime changes. The daily rate is strictly non-increasing and converges smoothly to its terminal value.

### Example

On Day 1, the protocol issues FLEX at approximately 2% of total allocated supply per day.

By the end of the ramp period, daily issuance has decayed to a level that, when compounded over a year, results in approximately 2% total annual supply growth.

### 5.2 Daily FLEX Issuance Calculation

On each FLEX Day, the protocol determines how many new FLEX tokens are introduced based on:

- the size of the protocol at that moment, and

- the applicable daily inflation rate for that day.

The size of the protocol is defined as the sum of:

- FLEX locked in active stakes, and

- FLEX held as liquid supply.

Any FLEX penalties collected from early stake termination on that day are added to issuance and redistributed rather than burned.

Conceptually, daily issuance follows this rule:

```text
new FLEX issued = (total staked FLEX + liquid FLEX) × daily inflation rate + redistributed penalties
```

This means issuance scales naturally with protocol size and that penalties are recycled back to committed participants.

### Example

Assume the following on a given FLEX Day:
```text
800,000,000 FLEX are staked

200,000,000 FLEX are liquid

total allocated supply = 1,000,000,000 FLEX

daily inflation rate = 1.5%
```

That day, the protocol issues:

```text
1,000,000,000 × 1.5% = 15,000,000 FLEX
```

If 500,000 FLEX were collected as penalties from early stake terminations on that day, total issuance becomes:

```text
15,000,000 + 500,000 = 15,500,000 FLEX
```

### 5.3 Allocation of Issuance to Staking Shares

Newly issued FLEX is not credited directly to user balances. Instead, it is allocated internally across active staking shares.

Each FLEX Day, the protocol records a snapshot value that represents how much FLEX is issued per unit of staking share for that day. Individual stake rewards are later derived using this snapshot.

In simple terms:

A stake receives the same fraction of daily issuance as its fraction of total active shares.

### Example

Assume on a given day:

```text
total issued FLEX = 15,500,000
total active staking shares = 100,000
a specific stake owns 2,000 shares

That stake represents 2% of all shares, so it receives:

15,500,000 × 2% = 310,000 FLEX
```

This calculation is deterministic, proportional, and identical for every stake.

### 5.4 Exclusivity of Inflation Rewards

Only active staking shares participate in inflation distribution.

Addresses holding FLEX without staking do not receive any portion of newly issued tokens. Inflation therefore rewards commitment rather than passive ownership.

Pending stakes, ended stakes, and transferred-out stakes are excluded from issuance until they become active or are replaced by an active owner.

### 5.5 Long-Term Supply Behavior

FLEX issuance never fully stops. Total supply increases indefinitely, but after the ramp period, growth occurs at a predictable and moderate rate corresponding to the terminal inflation constant.

There are no discretionary supply controls, no governance overrides, no buyback mechanics, and no issuance caps beyond those encoded in the inflation function.

### 5.6 Summary

The FLEX Protocol begins with approximately 2% daily inflation, transitions smoothly over a fixed period, and converges to approximately 2% annual inflation for the remainder of its lifetime.

All newly issued FLEX is distributed exclusively to active stakers, in direct proportion to their staking shares, using deterministic and fully transparent accounting rules.

## 6 bFLEX (BONUS FLEX TOKEN)

The FLEX Protocol includes an auxiliary token known as bFLEX. bFLEX is not a staking token, does not earn rewards by itself, and does not participate in inflation. Its sole purpose is to provide a staking share bonus when held at the moment a FLEX stake is created.

bFLEX acts as a commitment multiplier rather than a reward asset.

### bFLEX Supply and Distribution

The total supply of bFLEX is strictly limited to 1,000 tokens. No additional bFLEX can ever be minted.

Each bFLEX token is sold at a fixed price of 250 USDT. Purchases are conducted exclusively through the official website:

https://flexdefi.io

There is no per-address purchase limit. A single address may purchase any number of bFLEX tokens, subject only to remaining supply.

Once all 1,000 bFLEX tokens are sold, no further primary distribution will occur.

### Use of Funds and Liquidity Provision

All USDT collected from bFLEX purchases is sent directly to the team-controlled wallet. These funds are not held or managed by the FLEX token contract.

After the complete sale of all 1,000 bFLEX tokens, the team will provide liquidity for bFLEX on a decentralized exchange (PancakeSwap). The exact amount of liquidity to be provided is not fixed in advance and will be announced publicly after the sale is completed.

The team is not obligated to provide 100% of the raised funds as liquidity. Liquidity provisioning is an operational responsibility of the team and is not enforced by the FLEX Protocol smart contracts.

### bFLEX Utility and Bonus Mechanics

Holding at least one bFLEX token at the moment of stake creation grants a staking bonus by reducing the effective share price used in the staking share calculation.

This results in twice as many base staking shares for the same FLEX amount compared to a stake created without holding bFLEX.

### Important properties of the bFLEX bonus:

- The bonus is evaluated only once, at stake creation

- Holding more than one bFLEX does not increase the bonus further

- Selling or transferring bFLEX after stake creation does not affect existing stakes

- bFLEX has no effect on rewards, penalties, or share price updates after creation

The exact mathematical treatment of the bFLEX bonus is defined in Section 6.4 (Staking Shares and Bonuses) and is applied multiplicatively together with duration and irrevocable bonuses.

### Relationship to Staking and Protocol Security

bFLEX does not grant governance rights, administrative privileges, or protocol control. It cannot modify staking rules, inflation, auctions, or Big Pay Day logic.

Its role is strictly limited to incentivizing early or strategic participants who choose to acquire bFLEX and use it when creating long-term FLEX stakes.

Because bFLEX bonuses are applied only at stake creation and cannot be changed retroactively, the token does not introduce ongoing economic instability or dynamic advantage shifts.

### Summary

bFLEX is a fixed-supply auxiliary token designed to amplify staking power at creation time.

There are exactly 1,000 bFLEX tokens, each sold for 250 USDT through the official website. Any address may purchase multiple tokens. Liquidity will be added to PancakeSwap after the sale concludes, with the final liquidity amount announced by the team.

Holding bFLEX provides a one-time staking advantage as defined in Section 6.4 and does not affect protocol behavior beyond that scope.

## 7. STAKING (CORE MECHANISM)

Staking is the primary economic mechanism of the FLEX Protocol. By staking FLEX, participants convert liquid tokens into time-bound commitments that earn protocol issuance (FLEX inflation) and externally allocated rewards such as USDT.

All staking behavior is enforced entirely by smart contracts. Once a stake is created, its parameters are fixed and cannot be altered.

### 7.1 Creating a Stake

A stake is created when a participant commits a chosen amount of FLEX for a specified number of FLEX Days and selects whether the stake is revocable or irrevocable.

At the moment of creation, the staked FLEX is burned, permanently removing it from the circulating supply. The protocol records the stake internally and assigns it a unique identifier.

Stake creation is subject to strict bounds. The staked amount must be at least 1,000,000 base units, and the staking duration must be between 7 and 3,653 FLEX Days. Any attempt to create a stake outside these limits is rejected.

### 7.2 Stake Activation and Timing

A newly created stake does not begin earning rewards immediately. Instead, it becomes active at the start of the next FLEX Day.

For example, a stake created on FLEX Day 25 becomes active on FLEX Day 26 and begins earning rewards from that day forward. No rewards accrue while a stake is pending.

This delayed activation prevents same-day staking and reward extraction and ensures consistent daily accounting across the protocol.

### 7.3 Stake Types

The FLEX Protocol supports two types of stakes.

Revocable stakes may be ended before maturity and may withdraw rewards while active, but they are subject to penalties for early actions.

Irrevocable stakes cannot be ended before maturity and cannot withdraw rewards early. In exchange for this restriction, irrevocable stakes receive additional staking shares at creation.

The choice between revocable and irrevocable is permanent.

### 7.4 Staking Shares and Bonuses (Unified Weight Model)

Each stake is assigned a quantity of staking shares, which determine its weight in reward distribution. Shares are internal accounting units and are not transferable tokens.

In simple terms, shares reflect how much FLEX is staked, for how long, and under what conditions.


- Base Share Concept:

    At a high level, base shares are determined by dividing the staked FLEX amount by the current global share price. A lower share price results in more shares for the same amount of FLEX.

    Because the share price can only increase over time, earlier and longer commitments are structurally advantaged.


- Duration Bonus

    To strongly incentivize long-term participation, FLEX applies a non-linear duration bonus to staking shares.

    Unlike a simple linear multiplier, this bonus increases more aggressively with each additional year of staking. Each year adds more weight than the previous one, meaning longer commitments receive disproportionately higher rewards.

    For example, a 3-year stake earns significantly more than three separate 1-year stakes of the same size.


- bFLEX Bonus

    If the staking address holds at least one bFLEX token at the moment the stake is created, the effective share price used in the calculation is reduced by 50%.

    This results in twice as many base shares for the same FLEX amount. This bonus is evaluated only at stake creation and never changes afterward.


- Irrevocable Bonus

    If a stake is declared irrevocable, an additional 25% share bonus is applied. This compensates the staker for giving up early exit and early reward withdrawal options.     

Final Share Intuition

All bonuses apply multiplicatively. Conceptually, the final share amount behaves as:

```text
finalShares = (base shares) × (duration bonus) × (2× if bFLEX is held) × (1.25× if irrevocable)
```

As a result, two stakes with the same FLEX amount can earn vastly different rewards depending on duration, bFLEX usage, and revocability.

### 7.5 Reward Distribution (FLEX and USDT)

Once active, a stake earns rewards on a per-FLEX-Day basis.

Each day, the protocol determines:

- how much new FLEX is issued through inflation, and

- how much USDT has been allocated for distribution on that day, if any.

Rewards are distributed proportionally based on shares. A stake that owns 2% of all active shares on a given day receives 2% of that day’s FLEX and USDT rewards.

Rewards are calculated daily but accumulated internally until they are withdrawn or settled.

### 7.6 Withdrawing Rewards (Revocable Stakes Only)

Revocable stakes may withdraw accrued rewards while remaining active. Withdrawals may process all available days or a specified number of days, but they are only possible after the first full active FLEX Day.

Irrevocable stakes cannot withdraw rewards prior to maturity.

- Share Reduction on Withdrawal

    When rewards are withdrawn early, the protocol reduces the stake’s shares. The reduction equals the number of shares that would be created if the withdrawn reward were staked again for the remaining duration at the current share price.

    In practical terms, withdrawing rewards early lowers future earning power. This mechanism prevents compounding abuse and preserves long-term fairness.

### 7.7 Ending a Stake

A stake may be ended at any time, subject to its type.

Revocable stakes may be ended early but incur penalties. Irrevocable stakes may only be ended after maturity.

When a stake is ended, the protocol calculates all accrued FLEX and USDT rewards, applies any penalties, mints FLEX equal to the remaining principal plus rewards, transfers any USDT rewards, and removes the stake’s shares from global accounting.

Once ended, a stake is permanently closed.

### 7.8 Penalties

If a revocable stake is ended before maturity, 90% of the staked principal is penalized, unless the stake has not yet started or has fully matured. Penalized FLEX is redistributed to other stakers through the inflation mechanism.

After maturity, principal is never penalized. However, if rewards are claimed late, they may be reduced. The protocol allows a 14 FLEX Day grace period, after which rewards are reduced by 1% per full 7-day delay, capped at 100%.

### 7.9 Share Price Evolution

When a stake ends, the protocol evaluates whether the effective value of that stake implies a higher global share price.

If so, the share price increases, capped at 5% per update. The share price can never decrease.

This ensures that early and long-term participants are structurally favored over time.

### 7.10 Stake Transfers

Active stakes may be transferred to another externally owned account provided the stake is active, no rewards have been withdrawn, and the recipient is not a contract.

Transfers move the stake itself, not FLEX tokens. All economic parameters remain unchanged. Transfers are final and irreversible.

### 7.11 Summary

Staking in FLEX is deterministic, share-based, and time-weighted. It strongly rewards long-term commitment, discourages short-term extraction, and operates entirely without governance or discretionary control.

All rules are enforced on-chain and cannot be altered after deployment.

## 8. EXTERNAL USDT REWARDS

In addition to FLEX issuance, the protocol supports the distribution of externally supplied rewards denominated in USDT. These rewards are optional, additive, and fully decoupled from FLEX inflation. They do not affect token supply, share price dynamics, or staking principal.

USDT rewards exist solely as pass-through distributions from third parties to active stakers, enforced by deterministic accounting rules.

### 8.1 Purpose and Nature of USDT Rewards

USDT rewards allow external actors to inject value into the protocol without altering its monetary policy. The protocol does not mint, borrow, or otherwise create USDT. All USDT distributed must be transferred into the contract prior to allocation.

Participation in USDT rewards is automatic for eligible stakes. Stakers are not required to opt in, perform additional actions, or meet special conditions beyond those already required for staking.

### 8.2 USDT Allocation by FLEX Day

USDT rewards are distributed on a per-day basis to all active staking positions.

For a given FLEX Day, an external party may allocate a fixed amount of USDT to be distributed to stakers for that day. Once allocated, this USDT is distributed proportionally across all staking shares that are active on that FLEX Day.

In simple terms, each stake receives a portion of the daily USDT allocation equal to its share of the total active staking shares.

If a stake represents 5% of all active shares on a given day, it receives 5% of the USDT allocated for that day.

Formally, the USDT reward for a stake is calculated as:

```text
USDT reward for a stake = (daily USDT allocated) × (stake shares ÷ total active shares)
```

As an example, consider a FLEX Day where:

-- 1,000 USDT is allocated for distribution,

-- the total number of active staking shares is 100,000,

-- and a particular stake holds 2,500 shares.

That stake represents 2.5% of the total shares and therefore receives:

```text
1,000 × (2,500 ÷ 100,000) = 25 USDT
```

USDT rewards are recorded in the protocol’s daily snapshot for the corresponding FLEX Day and are later settled using the same claiming and accounting rules as FLEX staking rewards.

### 8.3 Eligibility for USDT Rewards

Only active staking shares participate in USDT reward distribution. Shares belonging to pending, ended, or otherwise inactive stakes are excluded.

USDT rewards are accrued in parallel with FLEX rewards and follow the same day-based accounting model.

### 8.4 Accumulation and Settlement

USDT rewards accumulate internally over FLEX Days and are not transferred immediately. Instead, they are settled when:

- a stake withdraws rewards (if permitted), or

- a stake is ended.

USDT rewards are transferred directly from the protocol contract to the staker’s address at settlement time, provided sufficient balance exists.

### 8.5 Insufficient USDT Balance Handling

The protocol does not mint or borrow USDT. If, at the time of settlement, the contract’s USDT balance is insufficient to cover the calculated reward, the protocol transfers up to the available balance.

No debt is recorded, and no retry mechanism exists. Any shortfall is final.

This behavior ensures that USDT rewards are strictly limited to funds actually provided.

### 8.6 Independence from FLEX Accounting

USDT rewards do not:

- affect FLEX inflation,

- alter staking shares,

- influence share price updates,

- or interact with penalty redistribution.

They are accounted for independently and exist solely as an additive reward stream.

## 9. DAILY AUCTIONS AND BIG PAY DAYS (FDA & BPD)

The FLEX Protocol introduces a finite auction-based distribution phase known as the Flex Daily Auction (FDA). This phase serves as the exclusive minting mechanism for the initial FLEX supply and simultaneously funds Big Pay Days (BPDs), a probabilistic USDT refund mechanism for committed auction participants.

All auction and Big Pay Day logic is enforced entirely by smart contracts. The protocol operates without a treasury, without governance control over distribution, and without discretionary intervention.

### 9.1 Auction Duration and FLEX Issuance

The auction phase spans exactly 150 consecutive FLEX Days, beginning on FLEX Day 1 and ending on FLEX Day 150.

Across this period, a total of 1.22 billion FLEX is minted according to a predefined and immutable schedule. On the first auction day, 20,000,000 FLEX is minted. On the second day, 14,000,000 FLEX is minted. On the third day, 9,000,000 FLEX is minted. From that point onward, the daily issuance decreases by 13,000 FLEX per day until the auction phase ends.

This schedule results in exactly 1.22B FLEX minted by the conclusion of FLEX Day 150. No FLEX is ever minted through auctions after this point.

### 9.2 Auction Participation and FLEX Allocation

On each auction day, participants may contribute USDT to that day’s auction pool, subject to the following constraints:

- Minimum contribution: 50 USDT

- Maximum contribution: 50,000 USDT

All contributions are pooled together. FLEX minted for the day is distributed strictly in proportion to the amount of USDT contributed.

If, for example, 20,000,000 FLEX is minted on a given day and the total auction pool contains 10,000 USDT, a participant who contributed 1,000 USDT (10% of the pool) will receive 2,000,000 FLEX (10% of the minted amount).

There is no ordering advantage, no timing optimization, and no preferential treatment.

### 9.3 Claiming Auction FLEX and Big Pay Day Eligibility

After an auction day concludes, participants are not required to claim their FLEX immediately. Auction rewards may be claimed on any subsequent FLEX Day, allowing participants to delay their decision.

However, all auction FLEX must be claimed no later than FLEX Day 170. Any auction rewards not claimed by that point are forfeited according to protocol rules.

When claiming auction FLEX, the participant must choose one of two mutually exclusive options:

- Claim as liquid FLEX, credited directly to the wallet

- Claim as a stake, creating an irrevocable auction stake

An address becomes eligible for Big Pay Days at the moment it claims auction FLEX as a stake.

Auction-created stakes are irrevocable by design and enforce the following properties:

- a minimum staking duration of 150 FLEX Days,

- no early stake termination,

- no early reward withdrawals,

- and a 25% irrevocable share bonus applied automatically.

If the address holds bFLEX at the time of claim, the standard bFLEX share modifier applies in addition to the irrevocable bonus.

If an address ever claims auction FLEX as liquid balance — even once — that address becomes permanently ineligible for all Big Pay Days, regardless of when the claim occurred. This disqualification is irreversible and enforced mechanically.

For example, a participant may contribute USDT on auction Day 10, wait until Day 14 to claim their FLEX as a stake, and immediately become eligible for Big Pay Days. If instead the participant claims liquid FLEX on any claim day, eligibility is permanently lost.

### 9.4 Distribution of Auction USDT

All USDT contributed during the auction phase is distributed as follows:

- 70% is reserved for Big Pay Days

- 10% is allocated to team, development, and operational expenses

- 10% is distributed to existing stakers as USDT rewards on the following FLEX Day

- 10% is allocated to FLEX/USDT liquidity provisioning

The FLEX token contract does not retain auction funds and does not operate a treasury.

### 9.5 Big Pay Days: Concept and Purpose

Big Pay Days are USDT refund events funded exclusively from the 70% auction allocation.

Rather than distributing this USDT evenly, the protocol concentrates refunds into discrete events. During a Big Pay Day, selected eligible addresses receive 100% of their cumulative auction USDT contribution back.

Big Pay Days do not mint FLEX, do not modify stakes, and do not affect staking rewards. They operate purely as a refund mechanism layered on top of the auction and staking systems.

### 9.6 Big Pay Day Execution and Refund Selection

On each auction day, the protocol executes at least 50 Big Pay Day refunds.

For each execution, the protocol maintains a historical list of all eligible addresses — meaning addresses that participated in the auction and claimed their FLEX as a stake.

At the start of a Big Pay Day execution, the contract requests a random value from Chainlink VRF v2.5. This random value determines the starting position in the eligibility list. From that position onward, addresses are selected sequentially.

Each selected address receives a full refund of its total auction USDT contribution, subject to a safety cap: no single refund may exceed 2% of the total Big Pay Day pool.

By default, a single execution processes up to 222 Big Pay Day refunds. If, after this execution, the remaining Big Pay Day pool still contains more than 1,000 USDT, the same function may be called again by anyone, permissionlessly. Each subsequent call follows the same rules and continues issuing refunds until the pool is exhausted.

An address does not lose eligibility after receiving a Big Pay Day refund. As long as the auction phase remains active and the address continues to satisfy the eligibility conditions, it may receive multiple Big Pay Day refunds across different executions and different days.

For example, an address that contributed 200 USDT during the auction phase and claimed its FLEX as a stake may receive a 200 USDT refund multiple times, provided it is selected in multiple Big Pay Day executions and the pool has sufficient funds.

### 9.7 Liquidity Provisioning During the Auction Phase

The 10% liquidity allocation from auction contributions is accumulated internally as USDT. Liquidity is added to the FLEX/USDT pair in controlled increments to reduce the risk of price manipulation.

When the accumulated liquidity allocation exceeds 500 USDT, the FDA contract:

- reads the current FLEX/USDT price,

- mints the corresponding amount of FLEX, and

- provides liquidity to the FLEX/USDT pair.

Each liquidity addition is capped at 1,000 USDT per transaction. If more liquidity is available, it is added incrementally across multiple transactions, with the price re-evaluated each time. This design significantly limits the feasibility of sniper or sandwich attacks.

### 9.8 Finality and Separation of Concerns

After FLEX Day 150:

- no further auctions are possible,

- no new auction stakes can be created,

- and FLEX issuance continues exclusively through staking inflation.

Neither the auction nor the Big Pay Day mechanisms alter staking durations, share calculations, inflation formulas, or reward accounting. All behavior is deterministic once deployed and cannot be paused, overridden, or redirected.

## 10. SECURITY CONSIDERATIONS

The FLEX Protocol is designed to operate in a hostile and adversarial environment. Its security model relies on immutability, deterministic execution, and strict separation between protocol logic and external dependencies. This section describes the assumptions, guarantees, and limitations inherent in that model.

### 10.1 Immutability and Absence of Administrative Control

Once deployed and initialized, the FLEX Protocol cannot be modified. No function exists to:

- change inflation parameters,

- alter staking rules,

- pause protocol operation,

- introduce governance,

- or redirect value flows.

There are no admin keys, upgrade proxies, emergency controls, or privileged roles. All protocol behavior is enforced exclusively by immutable smart contract logic.

Immutability guarantees predictability and neutrality, but it also implies that any undiscovered defect or unintended interaction cannot be corrected after deployment.

### 10.2 Deterministic Execution and Transaction Ordering

All economic outcomes in the FLEX Protocol are deterministic given:

- historical snapshots,

- stake parameters,

- protocol constants,

- and verified oracle inputs.

Reward calculations do not depend on transaction ordering within a FLEX Day. The use of discrete days and snapshot-based accounting ensures that front-running, miner extractable value (MEV), and timing manipulation do not alter reward allocation.

### 10.3 Oracle Trust Model (Chainlink VRF v2.5)

The only external dependency relied upon by the FLEX Protocol is Chainlink VRF v2.5, used exclusively for Big Pay Day selection.

The protocol assumes that:

- Chainlink VRF produces unpredictable randomness,

- the verification mechanism correctly validates randomness on-chain,

- and oracle responses are eventually delivered.

If Chainlink VRF were to fail permanently or cease operation, Big Pay Day selection could not occur. In such a scenario, no fallback or alternative randomness source exists, and BPDs would remain unexecuted.

No other part of the protocol depends on oracles.

### 10.4 Contract Interaction Constraints

The FLEX Protocol enforces restrictions on which entities may interact with certain functions. In particular:

stake creation, transfers, and withdrawals are restricted to externally owned accounts,

contracts are explicitly excluded from performing user-level staking actions.

These constraints are enforced to reduce composability risk, prevent automated abuse, and ensure that protocol assumptions about user behavior remain valid.

The protocol does not attempt to detect or block contract-based interactions beyond these explicit checks.

### 10.5 Economic Attack Surfaces

The protocol does not rely on price oracles, collateral ratios, or liquidations. As such, it is not directly exposed to oracle manipulation, cascading liquidations, or market price volatility.

However, economic risks remain, including:

- dilution through inflation,

- opportunity cost of long-term commitments,

- and concentration effects during Big Pay Days.

All such risks are intrinsic to the protocol’s design and are not mitigated by discretionary intervention.

### 10.6 User Responsibility and Operational Risk

Participants are solely responsible for:

- safeguarding private keys,

- understanding stake durations and penalties,

- executing transactions correctly,

- and monitoring protocol state.

The protocol cannot recover lost keys, reverse transactions, or compensate users for mistakes.

### 10.7 External Infrastructure Dependencies

The protocol operates on a public blockchain and therefore inherits all risks associated with that environment, including:

- network congestion,

- chain reorganizations,

- consensus failures,

- and long-term viability of the underlying chain.

These risks are external to the protocol and cannot be mitigated by its design.

## 11. TERMINOLOGY

For the purposes of this document, the following terms are used with precise and consistent meaning.

- FLEX:       
    The native fungible ERC-20 token governed by the FLEX Protocol smart contracts.    

- FLEX Protocol:         
    The complete set of immutable smart contracts that define token issuance, staking, rewards, penalties, auctions, and Big Pay Days.  

- FLEX Day:           
    A discrete unit of protocol time equal to 86400 seconds, indexed from the protocol’s launch timestamp.    

- Allocated Supply:           
    The sum of circulating FLEX tokens and FLEX committed to active stakes. 

- Circulating Supply:       
    The total number of FLEX tokens currently in existence (circulating) and transferable.    

- Stake:         
    A time-bound commitment created by burning FLEX tokens in exchange for staking shares and future rewards.   

- Staking Shares:           
    Internal accounting units representing a stake’s (power) proportional entitlement to rewards.   

- Share Price:         
    A global value used to convert FLEX amounts into staking shares at creation time. The share price is monotonically non-decreasing.      

- Active Stake:               
    A stake that has passed its start FLEX Day and has not yet been ended or transferred.       

- Pending Stake:             
    A stake that has been created but has not yet reached its start FLEX Day.       

- Mature Stake:               
    A stake that has reached its final FLEX Day but has not yet been ended.     

- Irrevocable Stake:             
    A stake that cannot be ended early or withdraw rewards prior to maturity, in exchange for additional staking shares.        

- bFLEX:             
    An auxiliary token whose presence at stake creation reduces the effective share price, resulting in increased staking shares.       

- Snapshot:               
    A record of global protocol state for a specific FLEX Day, used to ensure deterministic reward calculations.        

- Penalty:             
    A reduction applied to staked principal or rewards as a consequence of early termination or delayed claims.     

- Flex Daily Auction (FDA):               
    The initial 150-day auction mechanism through which FLEX is distributed and automatically staked.       

- Big Pay Day (BPD):       
    A probabilistic redistribution event selected using Chainlink VRF v2.5 that concentrates rewards on a randomly selected FLEX Day.       

## 12. FINAL NOTES AND CONSTITUTIONAL CLOSURE

The FLEX Protocol is defined entirely by code. This document does not supersede the behavior of deployed smart contracts, nor does it introduce rights, guarantees, or obligations beyond those enforced on-chain.

All protocol rules described herein are immutable once deployed. Participation in the FLEX Protocol constitutes acceptance of its mechanics, risks, and limitations.

No authority exists to interpret, amend, or override the protocol’s behavior. In the event of ambiguity between this document and on-chain execution, the smart contracts take precedence.

This document exists to explain the protocol—not to modify it.

End of FLEX Protocol Constitution.