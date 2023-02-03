import ICars from "../../../src/interface/ICars";
// create
const carMock: ICars = {
  model: 'Golf',
  year: 2002,
  color: 'blue',
  status: true,
  buyValue: 1000,
  doorsQty: 1,
  seatsQty: 2,
}
// findById
const carMockById: ICars & { _id: string } = {
  _id: '62cf1fc6498565d94eba52sc',
  model: 'Golf',
  year: 2002,
  color: 'blue',
  status: true,
  buyValue: 1000,
  doorsQty: 1,
  seatsQty: 2,
}
// update
const carMockForChange: ICars = {
  model: 'Gol',
  year: 2012,
  color: 'yellow',
  status: true,
  buyValue: 1000,
  doorsQty: 1,
  seatsQty: 2,
}

const carMockForChangeById: ICars & { _id: string } = {
  _id: '62cf1fc6498565d94eba52sc',
  model: 'Gol',
  year: 2012,
  color: 'yellow',
  status: true,
  buyValue: 1000,
  doorsQty: 1,
  seatsQty: 2,
}

export {
  carMock,
  carMockById,
  carMockForChange,
  carMockForChangeById,
};
