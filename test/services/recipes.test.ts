import app from '../../src/app';

describe('\'recipes\' service', () => {
  it('registered the service', () => {
    const service = app.service('recipes');
    expect(service).toBeTruthy();
  });
});
