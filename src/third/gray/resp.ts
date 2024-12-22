
export interface GraySwitchVo{
    switchName: string,
    serverName: string,
    // 规则类型，0 业务规则 1 流量规则
    switchType: number,
    instanceList: string[],
    chooseALl: number,
    oldDownStream?: string,
    oldUri?: string,
    newDownStream?: string,
    newUri?: string,
    grayCondition:string,
    originConditionList: RuleExpression[],
    languageType: number,
    // 0 按次数  1 按百分比(权重)
    grayType: number,

}

export interface RuleExpression{
    params: string,
    operatorValue: string,
    value: string,
    relationValue: string,
    // 摊销规则， 当且仅当value 是数组类型时 value是按元素分摊算 还是整体全摊
    amortizationType: number,
}