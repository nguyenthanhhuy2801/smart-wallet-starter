import { getChainProvider } from './provider';
import type { ContractInterface } from 'ethers';
import type { Provider, Wallet } from 'zksync-ethers';
import { Contract } from 'zksync-ethers';
import type { InitOptions } from './types';

type ContractName =
    | 'batchCaller'
    | 'implementation'
    | 'registry'
    | 'gaslessPaymaster'
    | 'claveProxy'
    | 'passkeyValidator'
    | 'accountFactory';

export const defaultContracts: Record<string, string> = {
      batchCaller: '0x6bBd2A2eA01e0EEB4D4cd43925edF4aca54C610B',
      implementation: '0xd9DaC5dE8e66Ba514052eb27c434c0e7483fADb1',
      registry: '0x1121e1AC7927e9a60DbCCe830F4f97CE667A8CB3',
      gaslessPaymaster: '0x9321Ec8Fe436527a19833F36442Af1200a3d9F37',
      claveProxy: '0xC9EE42016e083f384870ad80afb27e82737cBFF8',
      passkeyValidator: '0xd7d7A656fC5eD670a56dBD1eDF5Fd9D59A2DaC4B',
      accountFactory: '0xC0eF5260c2262974A027a1FED52fF00c9Be2C8DF'
};

export class SmartContract {
    private readonly provider: Provider;
    batchCaller: string;
    implementation: string;
    registry: string;
    gaslessPaymaster: string;
    claveProxy: string;
    passkeyValidator: string;
    accountFactory: string;

    constructor({ contracts, chainId }: InitOptions) {
        this.provider = getChainProvider(chainId);
        this.batchCaller = contracts.batchCaller;
        this.implementation = contracts.implementation;
        this.registry = contracts.registry;
        this.gaslessPaymaster = contracts.gaslessPaymaster;
        this.claveProxy = contracts.claveProxy;
        this.passkeyValidator = contracts.passkeyValidator;
        this.accountFactory = contracts.accountFactory;
    }

    public static create(options: InitOptions): SmartContract {
        return new SmartContract(options);
    }

    /**
     * Getting a specific contract instance
     */
    public getContract(contractName: ContractName, abi: ContractInterface) {
        return new Contract(this[contractName], abi, this.provider);
    }

    /**
     * Getting a specific contract instance with EOA signer
     */
    public getContractWithEOASigner(
        contractName: ContractName,
        abi: ContractInterface,
        wallet: Wallet,
    ) {
        return new Contract(this[contractName], abi, wallet);
    }
}
