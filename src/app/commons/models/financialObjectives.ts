export class FinancialObjectives {
  id?: any;
  index?: any;
  type?: any;
  textLabel?: any;
  label?: any;
  salesAchieved?: any = [{salesAchieved: '', year: new Date().getFullYear() - 1}];
  estimate?: any;
  projected?: any = [{projected: '', year: new Date().getFullYear() + 1}];
  annualCompoundGrowth?: any;
}

export class FinancialObjectivesBody {
  netSales?: FinancialObjectives = new FinancialObjectives();
  averageGrowth?: FinancialObjectives = new FinancialObjectives();
  averageGrossMargin?: FinancialObjectives = new FinancialObjectives();
  directCost?: FinancialObjectives = new FinancialObjectives();
  grossMargin?: FinancialObjectives = new FinancialObjectives();
  marketingBudget?: FinancialObjectives = new FinancialObjectives();
  salesBudget?: FinancialObjectives = new FinancialObjectives();
  otherCosts?: FinancialObjectives = new FinancialObjectives();
  settings?: FinancialObjectives = new FinancialObjectives();
  salesMarketingExpenses?: FinancialObjectives = new FinancialObjectives();
  marketingExpenses?: FinancialObjectives = new FinancialObjectives();
  administrativeOtherCosts?: FinancialObjectives = new FinancialObjectives();
  earningsBeforeTaxes?: FinancialObjectives = new FinancialObjectives();
  ebitda?: FinancialObjectives = new FinancialObjectives();
  operationsReview?: FinancialObjectives = new FinancialObjectives();
  numberInterestedClientsContacted?: FinancialObjectives = new FinancialObjectives();
  ebitdaSellingExpenses?: FinancialObjectives = new FinancialObjectives();
  administrativeExpensesSales?: FinancialObjectives = new FinancialObjectives();

  public financialObjectivesBodyList = [this.netSales, this.averageGrowth, this.averageGrossMargin, this.directCost,
    this.grossMargin, this.marketingBudget, this.salesBudget, this.otherCosts, this.settings,
    this.salesMarketingExpenses, this.marketingExpenses, this.administrativeOtherCosts,
    this.earningsBeforeTaxes, this.ebitda, this.operationsReview, this.numberInterestedClientsContacted,
    this.ebitdaSellingExpenses, this.administrativeExpensesSales];

}
