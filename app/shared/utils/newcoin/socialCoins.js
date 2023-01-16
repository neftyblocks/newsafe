import eos from '../../actions/helpers/eos';

export const getSocialCoins = async (name, connection) => {
  if (name) {
    const { rpc } = eos(connection, false, true);
    // upper bound should be filled with 'z' until length is 12
    const nameUpperBound = name + 'z'.repeat(12 - name.length);
    const [exactTokenResponseP, ownerResponseP] = await Promise.all([
      getSocialCoin(connection, name),
      rpc.get_table_rows({
        json: true,
        code: 'pools2.nco',
        scope: 'pools2.nco',
        table: 'pools',
        lower_bound: name,
        upper_bound: nameUpperBound,
        limit: 50,
        index_position: '3',
        key_type: 'name',
      })
    ]);
    const result = [];
    const codeSet = new Set();
    if (exactTokenResponseP) {
      result.push(exactTokenResponseP);
      codeSet.add(exactTokenResponseP.code);
    }
    if (ownerResponseP.rows) {
      const rows = ownerResponseP.rows.filter((row) => !codeSet.has(row.code));
      result.push(...rows);
    }
    return result;
  }
  return [];
};

export const getSocialCoin = async (connection, code) => {
  const { rpc } = eos(connection, false, true);
  const r = await rpc.get_table_rows({
    json: true,
    code: 'pools2.nco',
    scope: 'pools2.nco',
    table: 'pools',
    lower_bound: code.toUpperCase(),
    upper_bound: code.toUpperCase(),
    limit: 50,
    index_position: '2',
    key_type: 'i64',
  });
  if (r.rows && r.rows.length > 0) {
    return r.rows[0];
  }
  return null;
}

export const getCurrencyBalance = async (account, connection) => {
  const { rpc } = eos(connection, false, true);
  const [response] = await rpc.get_currency_balance('pool.nco', account, 'GNCO');
  if (!response) {
    return 0;
  }
  const [balance] = response.split(' ');
  return +balance;
};

export const swapTokens = async (account, poolId, amount, connection) => {
  const action = {
    account: 'pool.nco',
    name: 'transfer',
    authorization: [{
      actor: account,
      permission: 'active',
    }],
    data: {
      from: account,
      to: 'pools2.nco',
      quantity: `${amount.toFixed(4)} GNCO`,
      memo: `pool:${poolId}`,
    },
  };

  const signer = eos(connection, true, true);
  return signer.transact({ actions: [action] }, {
    broadcast: connection.broadcast,
    expireSeconds: connection.expireSeconds,
    sign: connection.sign
  });
};