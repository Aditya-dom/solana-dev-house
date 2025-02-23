#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod Solanavotingpro {
    use super::*;

  pub fn close(_ctx: Context<CloseSolanavotingpro>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.Solanavotingpro.count = ctx.accounts.Solanavotingpro.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.Solanavotingpro.count = ctx.accounts.Solanavotingpro.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSolanavotingpro>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.Solanavotingpro.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSolanavotingpro<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Solanavotingpro::INIT_SPACE,
  payer = payer
  )]
  pub Solanavotingpro: Account<'info, Solanavotingpro>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSolanavotingpro<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub Solanavotingpro: Account<'info, Solanavotingpro>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub Solanavotingpro: Account<'info, Solanavotingpro>,
}

#[account]
#[derive(InitSpace)]
pub struct Solanavotingpro {
  count: u8,
}
