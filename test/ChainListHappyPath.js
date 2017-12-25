const ChainList = artifacts.require('./ChainList.sol');

contract('ChainList', accounts => {
  let ChainListInstance;
  const seller = accounts[0];
  const articleName = 'My Article';
  const articleDescription = 'Description for my article';
  const articlePrice = 10;

  it('should be initialized with empty values', async () => {
    const instance = await ChainList.deployed();
    const data = await instance.getArticle.call();

    assert.equal(data[0], 0x0, 'Seller must be empty');
    assert.equal(data[1], '', 'Article name must be empty');
    assert.equal(data[2], '', 'Description must be empty');
    assert.equal(data[3].toNumber(), 0, 'Article price must be zero');
  });

  it('should sell an article', async () => {
    ChainListInstance = await ChainList.deployed();

    await ChainListInstance.sellArticle(
      articleName,
      articleDescription,
      web3.toWei(articlePrice, 'ether'),
      { from: seller },
    );

    const data = await ChainListInstance.getArticle.call();

    assert.equal(data[0], seller, `Seller must be ${seller}`);
    assert.equal(data[1], articleName, `Name must be ${articleName}`);
    assert.equal(data[2], articleDescription);
    assert.equal(data[3].toNumber(), web3.toWei(articlePrice, 'ether'));
  });
});
