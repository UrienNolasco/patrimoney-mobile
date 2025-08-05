export type GoalType = "VALUE_TARGET" | "DATE_TARGET" | "RECURRING_INVESTMENT";

interface GoalBase {
  id: string;
  walletId: string;
  title: string;
  description: string;
  type: GoalType;
  currentValue: number;
  createdAt: string;
  updatedAt: string;
}

export interface ValueTargetGoal extends GoalBase {
  type: "VALUE_TARGET";
  targetValue: number;
}

export interface DateTargetGoal extends GoalBase {
  type: "DATE_TARGET";
  targetDate: string;
}

export interface RecurringInvestmentGoal extends GoalBase {
  type: "RECURRING_INVESTMENT";
}

export type Goal = ValueTargetGoal | DateTargetGoal | RecurringInvestmentGoal;

export type CreateValueTargetPayload = Omit<
  ValueTargetGoal,
  "id" | "walletId" | "currentValue" | "createdAt" | "updatedAt"
>;
export type CreateDateTargetPayload = Omit<
  DateTargetGoal,
  "id" | "walletId" | "currentValue" | "createdAt" | "updatedAt"
>;
export type CreateRecurringInvestmentPayload = Omit<
  RecurringInvestmentGoal,
  "id" | "walletId" | "currentValue" | "createdAt" | "updatedAt"
>;

export type CreateGoalPayload = { walletId: string } & (
  | Omit<CreateValueTargetPayload, "type">
  | Omit<CreateDateTargetPayload, "type">
  | Omit<CreateRecurringInvestmentPayload, "type">
) & { type: GoalType };

export interface ContributeToGoalPayload {
  amount: number;
}

export interface UpdateGoalPayload {
  title?: string;
  description?: string;
}
