import { ChainId, WAVAX } from '@pangolindex/sdk'
import { SingleSideStaking } from './hooks'
import { Tokens } from '@pangolindex/components'

const { PNG } = Tokens

export const SINGLE_SIDE_STAKING: { [key: string]: SingleSideStaking } = {
  WAVAX_V0: {
    rewardToken: WAVAX[ChainId.AVALANCHE],
    conversionRouteHops: [],
    stakingRewardAddress: '0xD49B406A7A29D64e081164F6C3353C599A2EeAE9',
    version: 0
  },
  PNG_V0: {
    rewardToken: PNG[ChainId.AVALANCHE],
    conversionRouteHops: [WAVAX[ChainId.AVALANCHE]],
    stakingRewardAddress: '0x88afdaE1a9F58Da3E68584421937E5F564A0135b',
    version: 0
  }
}

export const SINGLE_SIDE_STAKING_V0: SingleSideStaking[] = Object.values(SINGLE_SIDE_STAKING).filter(
  staking => staking.version === 0
)

console.log(SINGLE_SIDE_STAKING_V0)

const FUJI_SINGLE_SIDE_STAKING: SingleSideStaking[] = [
  {
    rewardToken: PNG[ChainId.FUJI],
    conversionRouteHops: [WAVAX[ChainId.FUJI]],
    stakingRewardAddress: '0x5610E572c9f2a10BFd15861061F8B1Fe75e05b23',
    version: 0
  }
]

export const SINGLE_SIDE_STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: SingleSideStaking[][]
} = {
  [ChainId.AVALANCHE]: [SINGLE_SIDE_STAKING_V0],
  [ChainId.FUJI]: [FUJI_SINGLE_SIDE_STAKING]
}
