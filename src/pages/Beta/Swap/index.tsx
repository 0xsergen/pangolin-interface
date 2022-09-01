import React, { useState } from 'react'
import { PageWrapper, GridContainer, TopContainer, StatsWrapper } from './styleds'
import { MyPortfolio, SwapWidget, WatchList, SwapTypes } from '@pangolindex/components'
import PairInfo from './PairInfo'
import LimitOrderList from './LimitOrderList'
import { useChainId } from 'src/hooks'
import { CHAINS } from '@pangolindex/sdk'
import { isEvmChain } from 'src/utils'
import ComingSoon from 'src/components/Beta/ComingSoon'
import { useGelatoLimitOrdersHook } from 'src/state/swap/multiChainsHooks'

const SwapUI = () => {
  const chainId = useChainId()
  const useGelatoLimitOrders = useGelatoLimitOrdersHook[chainId]
  const { allOrders } = useGelatoLimitOrders()
  const [swapType, onSwapTypeChange] = useState(SwapTypes.MARKET)
  const isLimitOrders = (allOrders || []).length > 0 && swapType === SwapTypes.LIMIT
  return (
    <PageWrapper>
      <TopContainer>
        <StatsWrapper>{isEvmChain(chainId) ? <PairInfo /> : <ComingSoon />}</StatsWrapper>
        <SwapWidget onSwapTypeChange={onSwapTypeChange} isLimitOrderVisible={CHAINS[chainId]?.mainnet} />
      </TopContainer>

      {CHAINS[chainId]?.mainnet && isEvmChain(chainId) && (
        <GridContainer isLimitOrders={isLimitOrders}>
          {isLimitOrders && <LimitOrderList />}
          <MyPortfolio />
          <WatchList coinChartVisible={!isLimitOrders} />
        </GridContainer>
      )}
    </PageWrapper>
  )
}
export default SwapUI
