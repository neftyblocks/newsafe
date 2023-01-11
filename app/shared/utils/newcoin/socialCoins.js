import eos from '../../actions/helpers/eos';

export const getSocialCoins = async (name, connection) => {
  if (name) {
    const { rpc } = eos(connection, false, true);
    // upper bound should be filled with 'z' until length is 12
    const nameUpperBound = name + 'z'.repeat(12 - name.length);
    const [exactTokenResponseP, ownerResponseP] = await Promise.all([
      rpc.get_table_rows({
        json: true,
        code: 'pools2.nco',
        scope: 'pools2.nco',
        table: 'pools',
        lower_bound: name.toUpperCase(),
        upper_bound: name.toUpperCase(),
        limit: 50,
        index_position: '2',
        key_type: 'i64',
      }),
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
    if (exactTokenResponseP.rows) {
      result.push(...exactTokenResponseP.rows);
      exactTokenResponseP.rows.forEach((row) => codeSet.add(row.code));
    }
    if (ownerResponseP.rows) {
      const rows = ownerResponseP.rows.filter((row) => !codeSet.has(row.code));
      result.push(...rows);
    }
    return result;
  }
  return [];
};

export const getCurrencyBalance = async (account, connection) => {
  const { rpc } = eos(connection, false, true);
  const [response] = await rpc.get_currency_balance('pool.nco', account, 'GNCO');
  const [balance] = response.split(' ');
  return +balance;
};

export default getSocialCoins;
