import { useAddress, useContract, useNFT } from '@thirdweb-dev/react'
import BurnNFT from './BurnNft'
import ModalTransfer from './ModalTransfer'
import NotOwned from './NotOwned'

export default function ShowNft({ id, contractAddress }) {
  const { contract } = useContract(contractAddress)
  const { data: nft, isLoading, error } = useNFT(contract, id)
  const address = useAddress()

  if (isLoading) return <div>Loading...</div>
  if (error || !nft) return <div>NFT not found</div>
  return (
    <div className="container">
      <div className="card border-success-subtle">
        <img src={nft.metadata.image} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title fst-italic text-success">
            {nft.metadata.name}
          </h5>
          {/* <p className="card-text">{nft.metadata.description}</p> */}
          {address === nft.owner && (
            <div className="d-flex justify-content-around">
              <BurnNFT id={id} contractAddress={contractAddress} />
              <ModalTransfer id={id} contractAddress={contractAddress} />
            </div>
          )}
          {address !== nft.owner && <NotOwned />}
        </div>
      </div>
    </div>
  )
}
