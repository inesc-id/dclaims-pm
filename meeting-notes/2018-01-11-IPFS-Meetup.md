# IPFS Meetup Presentation
> [The Block](https://www.facebook.com/theblock.cafe.lisboa), Lisbon, January 11th, 2018
# DClaims

Slides pdf: [here](https://github.com/inesc-id/hypercerts-pm/blob/master/presentations/dlcaims_ifps_meetup_jan2018.pdf)


## Slides Notes
(Each item is a slide)

1. Cover: Dclaims is a distributed verifiable claims (W3C spec) platform, that uses IPFS and Ethereum.
2. Presentation: My name is João, pursuing my MSc at IST. DClaims is my thesis project
3. What are VC? (crowd participation)
4. > A verifiable claim is a qualification, achievement, quality, or piece of information about an entity's background such as a name, government ID, payment provider, home address, or university degree. Such a claim describes a quality or qualities, property or properties of an entity which establish its existence and uniqueness. As companies move more and more business into the internet, there is the need to issue and verify claims instantly. 

    An example would be a university digital diploma, singed by the university's private key, that I can take to any employerand they can verify it. This diploma should continue to be verifiable even if the university ceases to exist.
5. Properties of VC (explain each):
    - Issue
    - Share/retrieve
    - Verify
    - Revoke
6. DClaims are distributed verifiable claims
7. So how do we make it distributed and trustless?
8. 
    - DClaims is a platform that enables entities to make claims
    - Claims are stored on IPFS
        - Distributed file systems
        - Ensures the links don't get broken
    - An Ethereum smart-contract is used to keep track of the claims
        - Ethereum is like a world computer
        - Runs on a blockchain
        - Allows for the creation of smart-contracts ([more about smart-contracts here](https://blog.zeppelin.solutions/the-hitchhikers-guide-to-smart-contracts-in-ethereum-848f08001f05))
        - Turing complete
9. On top of this platform, one can create any application that can use verifiable claims
10. Inspired by recent events (possibly giggles here) we decided to take a crack at Fake News and so we developed DClaims News, which is a browser extension built on top of DClaims that allows people to make claims about news articles, from any news website.
11. So this is how DClaims-News sits on top of DClaims
12. Let's take a look at an example
    - A user creates a Claim, A, with ID=123 and Content="Hello, World"
13. DClaims adds that claim to IPFS, which returns the IPFS link (multihash)
14. DClaims takes that ipfs_link and adds it to the Ethereum smart-contract, indexed by the ID. Meaning that for each ID there can be several claims. (note to self: change _id_ to something better like _index_)
15. [Demo video here](https://youtu.be/U0KP8Wr-IP4)
16. So, reviewing the demo, here's what works today (Jan 11,2018) on the DClaims News web extension:
    - Simple to adapt to any news website
    - Users can create claims about any news article
    - User can view claims other users made
    - Users can chose whose claims they want to see, by adding the user ID's to a whitelist
17. Features of DClaims News
    - **Censorship resistant**: The application is ran locally, so news websites can not prevent users from running the extension on their website. The most they could do would be to change the name of the HTML classes, but we would quickly catch up.
    - **Secure**: 
        - Ethereum assures the **authenticity** of the claims (being that we use the issuers' Ethereum wallet address to for identification)
        - IPFS assures the integrity of the claims because if a claim's content was changed so would the link to that claim. An IPFS link works as a snapshot of the claim object. An IPFS link always resolves to the same version of an object.
    - **Resilient:** Due to its highly distributed and trustless architecture, the system has no single point of failure that could be attacked. _The way to bring it down would be to destroy the entire IPFS and Ethereum networks, but at that point the world would probably be destroyed as well, so news articles would be the least concern on people's minds._
18. What will work in the future:
    - Publishers: 
        - Entities that work as proxies to between issuers and the ethereum network.
        - Publishers receiver batch claims for a certain news article. When a publisher has receiver X (x being a treshold that can be defined by each publisher)
        - The single claims are batched into one larger claim, a batch, which is added to IPFS and issued in Ethereum as one transaction, which drops the price. Price of issuing one single claim = price of issuing a batch (which can have any number of single claims).
        - Publishers can then chose if they want to carry the cost of issuing to the issuers (100 claims from 100 different issuers, the ehthereum transaction price was 1USD, so each issuer would pay 0.01USD) **or** pay for the issuing themselves by implementing other mechanisms to generate revenue (display ads, have the issuers mine some cryptocurrency for them, mass adoption like review websites)
        - **What about misbehaved publishers?**
            - Since publishers act as a proxy between issuers and the Ethereum smart-contract, in theory they could chose **not to issue claims that they don't like**, effectively introducing **censorship** in the system. For that problem we have thought about two solutions, both based on the assumtption that everytime a issuer sends a claim to be issued by a publisher, the publisher replies with a **receipt** that a) acknowledges having received the claim (eg. returning the claim signed by the publisher) and b) has a prediction of when that claim will be issued (the block interval where that batch might be issued, eg. _"your claim will be inserted in the batch with ID=X and should be inserted between blocks 1234567 and 1234590"_):
                - 1) If the Issuers queries the blocks that he had on the receipt and verifies that the claim has not been inserted there, the Issuer could generate a new claim (issue it directly) where he proves (using the receipt) the publisher misbehaved. That claim could be issued in a "Bad-Publishers" smart-contract, which would warn the community not ti use that specific Publisher.
                - 2) A more dramatic, but possibly more effective approach would be to have publishers placing money in a smart-contract, as escrow. That smart-contract could receive "complaints" from issuers, which would contain the receipt sent by the publisher to that issuer. The smart-contract could then query the other smart contract (where the claim was supposed to be issued) and check if it had indeed been issued or not. If the smart-contract determined that the issue misbehaved, the value (or part of) the publisher had placed in escrow would be transfered to the complainant issuer. **If batches are issued as a merkle tree, the merkle root would be the ipfs link and there is a great optimization that can be done here. This is what Clement and I talked about.** @nuno-santos these are juicy details for the paper, we should discuss them further.
    - Curators
        - Entities that take existing claims and generate new ones, based on the original ones.
            - Eg. "A Curator finds 100 claims about news article A. He would then issue a new claim saying something like '40% of claims classify this article as having a misleading title' "
        - This would be useful for the end consumer, who could chose to subscribe to Curators rather than to individual issuers (Looking at a police report vs interviewing all the people involved in an event)

## Feedback

- Some people asked how this would actually solve Fake News given that the greater issue is the fact that people simply chose not to believe facts.
    - Response: This system is for people who care about the truth and are capable of engaging in rational discussions. The problem of confirmation bias is outside of the scope of what we are doing. It's about making it easier for people who actually want to learn.
- Someone suggested that Ethereum was not necessary given the somewhat static nature of the system (claims are not) and that we could use a decentralized database like BigChainDB
    - Response: I pointed out that altough bigchaindb uses IPFS, it is still a centralized service since  a user eneds bigchain db's servers to use the service. Using a centralized service is against what we are trying to accomplish. I also pointed that even though right now the system supports very few operations and ethereum might seem like an overkill, overtime the gola is to add features and make better use of ethereum.
- Someone asked how we were doing revocation
    - Response: As of now revocation is not implemented for dclaims. I pointed to the work I've been doing with  Blockcerts revocation (we have ethereum revocation of blockcerts almost complete, we have a working poc) and explained that the same system can be used for dclaims. For now, the quickest way to implement a simple revocation mechanism would be to have a revocation list that is hosted by each issuer (it has a bunch of problems, that were pointed out on my thesis project proposal, but it's OK to use that for this prototype).
- Someone pointed that we could use a punishment mechanism to prevent Publishers from misbehaving.
    - This discussion is already included in (slide18.publishers.What about misbehaved publishers)
- Someone pointed that we could use a transparent centralized architecture, using proof of authority, thus not needind ethereum. Essentially Publishers would host claims (so "Issuing" would be having a publisher host the claim os its servers). There could be several publishers, but at any time only one was the leader. Publishers could cheat but they would quickly be caught (because of the receipts, see slide18.publishers.What about misbehaved publishers) and a new Publisher would be chosen. The benefit of this approach is that the overall performance of the system would be dramatically improved.
    - Response: Both I and David discussed this when the question was made but we haven't really reached a conclusion. It feels like we would be loosing some assurances that Etherem gives us. Also the performance gains could probably be matched by using Publishers with Ethereum (since they can issue so many claims in a single Ethereum transaction)
