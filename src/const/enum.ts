export enum EnumTest {
    ADMIN = 'admin',
    EDITOR = 'admin-pro',
    VIE = 'user'
}

export enum TrueFalseEnum {
    True,
    False,
    Never
}


// 枚举策略都可以用牛逼
export namespace EnumTest{
    export function isAdmin(enumTest: EnumTest) {
        return enumTest?.includes('admin')
    }
}
