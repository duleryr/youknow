console.log('TURN ON DISTRIB');

var request = {
  bounds: yk.map.repr.getBounds(),
  types: ['atm']
};

yk.data['search'](request);