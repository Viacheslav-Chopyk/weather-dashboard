import { DirectionPipe } from './direction.pipe';

describe('DirectionPipe', () => {
  it('create an instance', () => {
    const pipe = new DirectionPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return "North" when input is "10"', () => {
    const pipe = new DirectionPipe();
    expect(pipe.transform(10)).toEqual('North');
  })
  it('should return "Northeast" when input is "50"', () => {
    const pipe = new DirectionPipe();
    expect(pipe.transform(50)).toEqual('Northeast');
  })
  it('should return "East" when input is "95"', () => {
    const pipe = new DirectionPipe();
    expect(pipe.transform(95)).toEqual('East');
  })

  it('should return "South" when input is "170"', () => {
    const pipe = new DirectionPipe();
    expect(pipe.transform(170)).toEqual('South');
  })

  it('should return "South" when input is "190"', () => {
    const pipe = new DirectionPipe();
    expect(pipe.transform(190)).toEqual('South');
  })

  it('should return "West" when input is "260"', () => {
    const pipe = new DirectionPipe();
    expect(pipe.transform(260)).toEqual('West');
  })

  it('should return "Northwest" when input is "310"', () => {
    const pipe = new DirectionPipe();
    expect(pipe.transform(310)).toEqual('Northwest');
  })

  it('should return "North" when input is "350"', () => {
    const pipe = new DirectionPipe();
    expect(pipe.transform(350)).toEqual('North');
  })

  // it('should return "North" when input is "360"', () => {
  //   const pipe = new DirectionPipe();
  //   expect(pipe.transform(360)).toEqual('North');
  // })

});
