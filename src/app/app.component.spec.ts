import { Student } from './student';

describe('spy lab', function () {
  let foo;

  let arrowFunc;

  beforeEach(function () {
    foo = {
      f1: () => { }
    };

    arrowFunc = () => {
      return 'test';
    };
  });

  // 1.returnValue
  it(`returnValue lab`, () => {
    // 設定 foo.f1 回傳值為'fake value'。
    spyOn(foo, 'f1').and.returnValue('fake value');

    // foo.f1() 呼叫時，會直接回傳 fake value
    let value = foo.f1();

    expect(value).toBe('fake value');
  });

  // 2.callFake
  it(`callFake lab`, () => {
    // 建立 foo.f1 假實作。
    spyOn(foo, 'f1').and.callFake(() => {
      console.log('Fake Method')
      return 'callFake';
    });

    //foo.f1() 呼叫的是被 Spy 的版本。
    let value = foo.f1();

    expect(value).toBe('callFake');
  });

  // 3. throwError
  it(`throwError lab`, () => {
    const student = new Student();

    // 設定 student.getMathScore 拋出 Ｍy Error 異常。
    spyOn(student, 'getMathScore').and.throwError('My Error');

    // getMathScore 被呼叫會拋出 My Error 異常
    expect(() => { student.getMathScore(); }).toThrowError('My Error');
  });


  // 4. callThrough
  it('callThrough lab', () => {
    const student = new Student();

    // getMathScore 被呼叫時依然會使用原本的版本，但 Spy 會對其做監測。
    const spy = spyOn(student, 'getMathScore').and.callThrough();

    expect(student.getMathScore()).toBe(100);
    expect(spy).toHaveBeenCalled();
  });

  // 5.toHaveBeenCalled()
  it('calls.any lab', () => {
    const student = new Student();
    const spy = spyOn(student, 'getMathScore');

    student.getMathScore();

    // 驗證 f1 是否被呼叫過
    expect(spy).toHaveBeenCalled();
  });


  // 5.toHaveBeenCalledTimes()
  it('calls.any lab', () => {
    const student = new Student();
    // 建立假的 getMathScore 方法
    const spy = spyOn(student, 'getMathScore');

    student.getMathScore();

    // 驗證 f1 是否被呼叫過
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // 6.calls.any
  it('calls.any lab', () => {
    const spyFoo = spyOn(foo, 'f1');

    foo.f1();

    // 驗證 f1 是否被呼叫過
    expect(spyFoo.calls.any()).toBe(true);
  });

  // 7.calls.count
  it('calls.any lab', () => {
    const spyFoo = spyOn(foo, 'f1');

    foo.f1();
    foo.f1();

    // spyFoo.calls.count() 傳回 2 次
    expect(spyFoo.calls.count()).toBe(2);
  });


  // 3. spyOnProperty
  it(`spyOnProperty lab`, () => {
    const student = new Student();
    const spy = spyOnProperty(student, 'Name', 'get');
    spy.and.returnValue('Allen');

    expect(student.Name).toBe('Allen');
    expect(spy).toHaveBeenCalled();
  });



  // spy.calls.count()
  // toHaveBeenCalledTimes()
});
