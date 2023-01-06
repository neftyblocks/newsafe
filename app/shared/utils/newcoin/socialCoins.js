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
    if (exactTokenResponseP.rows) {
      result.push(...exactTokenResponseP.rows);
    }
    if (ownerResponseP.rows) {
      result.push(...ownerResponseP.rows);
    }
    return result;
  }
  return [];
};

export default getSocialCoins;
