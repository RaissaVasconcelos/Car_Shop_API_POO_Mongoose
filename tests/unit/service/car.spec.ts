// import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
// import { spyOn } from 'tinyspy';
// import { Model } from 'mongoose';
// import Cars from '../../../src/Domains/Car';
// import CarService from '../../../src/Services/Car.service';
// // !
// const inputCar = {
//   model: 'Corolla',
//   year: 2002,
//   color: 'Amarelo',
//   status: true,
//   buyValue: 15.990,
//   doorsQty: 4,
//   seatsQty: 5,
// };

// const outputCar = new Cars({ ...inputCar, id: '63c71d53b564a171145492ec' });

// describe('Test in Service Car', function () {
//   it('Test', async () => {
//     vi.spyOn(Model, 'create').mockImplementation(outputCar as any);
//     const service = new CarService();
//     const result = await service.create(inputCar);
//     console.log('result', result);
//     expect(result).toEqual(outputCar)
//   })
// });
