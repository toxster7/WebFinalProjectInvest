"use strict";

const store_yahoo = {
	namespaced: true,
	
	modules: {
		alert: store_alert,
	},		
	
	state: {
		symbol: undefined,
		summary: undefined,
		quote: undefined,
	},
	
	getters: {
		summary: state => { return state.summary },
		quote: state => { return state.quote },
	},
	
	mutations: {
		setQuote( state, quote ) { 
			state.quote = quote;  
			
			let 
				summary = {},
				paths = [
				
					"quoteType.longName",
				
					"assetProfile.address1",
					"assetProfile.city",
					"assetProfile.companyOfficers",
					"assetProfile.country",
					"assetProfile.fullTimeEmployees",
					"assetProfile.industry",
					"assetProfile.phone",
					"assetProfile.sector",
					"assetProfile.state",
					"assetProfile.website",
					"assetProfile.zip",
				

				
					"defaultKeyStatistics.52WeekChange.fmt",
					"defaultKeyStatistics.beta.fmt",
					"defaultKeyStatistics.bookValue.fmt",
					"defaultKeyStatistics.dateShortInterest.fmt",
					"defaultKeyStatistics.earningsQuarterlyGrowth.fmt",
					"defaultKeyStatistics.enterpriseToEbitda.fmt",
					"defaultKeyStatistics.enterpriseToRevenue.fmt",
					"defaultKeyStatistics.enterpriseValue.fmt",
					"defaultKeyStatistics.floatShares.fmt",
					"defaultKeyStatistics.heldPercentInsiders.fmt",
					"defaultKeyStatistics.heldPercentInstitutions.fmt",
					"defaultKeyStatistics.impliedSharesOutstanding.fmt",
					"defaultKeyStatistics.lastFiscalYearEnd.fmt",
					"defaultKeyStatistics.lastSplitDate.fmt",
					"defaultKeyStatistics.lastSplitFactor",
					"defaultKeyStatistics.mostRecentQuarter.fmt",
					"defaultKeyStatistics.netIncomeToCommon.fmt",
					"defaultKeyStatistics.priceToBook.fmt",
					"defaultKeyStatistics.pegRatio.fmt",
					"defaultKeyStatistics.SandP52WeekChange.fmt",
					"defaultKeyStatistics.sharesOutstanding.fmt",
					"defaultKeyStatistics.sharesShortPreviousMonthDate.fmt",
					"defaultKeyStatistics.shortPercentOfFloat.fmt",
					"defaultKeyStatistics.shortRatio.fmt",
					"defaultKeyStatistics.sharesShortPriorMonth.fmt",
					"defaultKeyStatistics.sharesShort.fmt",
					"defaultKeyStatistics.trailingEps.fmt",
				

				
				
					"calendarEvents.dividendDate.fmt",
					"calendarEvents.earnings.earningsDate[0].fmt",
					"calendarEvents.earnings.earningsDate[1].fmt",
					"calendarEvents.exDividendDate.fmt",
				
				
				
					"summaryDetail.ask.fmt",
					"summaryDetail.askSize.raw",	
					"summaryDetail.averageVolume.fmt",
					"summaryDetail.averageVolume10days.fmt",
					"summaryDetail.averageVolume.longFmt",	
					"summaryDetail.beta.fmt",					
					"summaryDetail.bid.fmt",
					"summaryDetail.bidSize.raw",
					"summaryDetail.dayHigh.fmt",
					"summaryDetail.dayLow.fmt",
					"summaryDetail.dividendRate.fmt",
					"summaryDetail.dividendYield.fmt",
					"summaryDetail.exDividendDate.fmt",
					"summaryDetail.fiftyDayAverage.fmt",
					"summaryDetail.fiftyTwoWeekHigh.fmt",
					"summaryDetail.fiftyTwoWeekLow.fmt",
					"summaryDetail.fiveYearAvgDividendYield.fmt",
					"summaryDetail.forwardPE.fmt",
					"summaryDetail.marketCap.fmt",
					"summaryDetail.open.fmt",
					"summaryDetail.payoutRatio.fmt",
					"summaryDetail.previousClose.fmt",
					"summaryDetail.priceToSalesTrailing12Months.fmt",
					"summaryDetail.regularMarketVolume.longFmt",
					"summaryDetail.trailingAnnualDividendRate.fmt",
					"summaryDetail.trailingAnnualDividendYield.fmt",
					"summaryDetail.trailingPE.fmt",
					"summaryDetail.twoHundredDayAverage.fmt",
					
					

					
					
					
					
					"financialData.currentRatio.fmt",
					"financialData.debtToEquity.fmt",
					"financialData.ebitda.fmt",
					"financialData.freeCashflow.fmt",
					"financialData.grossProfits.fmt",
					"financialData.operatingCashflow.fmt",
					"financialData.operatingMargins.fmt",
					"financialData.profitMargins.fmt",
					"financialData.returnOnAssets.fmt",
					"financialData.returnOnEquity.fmt",
					"financialData.revenueGrowth.fmt",
					"financialData.revenuePerShare.fmt",
					"financialData.targetMeanPrice.fmt",
					"financialData.totalCash.fmt",
					"financialData.totalCashPerShare.fmt",
					"financialData.totalDebt.fmt",
					"financialData.totalRevenue.fmt",
				];
				

	
				
			paths.forEach( path => {
				let value = _.get( quote, path );
				if ( value === undefined ) _.set( summary, path, "N/A" ); else _.set( summary, path, value );
			});
			
			
			state.summary = summary;  
		},	
	},		
	
	
	actions: {
	
		getSummary( context, params ) {
		
			axios.get( "https://api.json.trade/yahoo/summary", { params: { symbol: params.symbol}} ).then(response => {
				if ( response.data.success ) {
					
					context.commit("setQuote", response.data.data);

					
					if ( context.state.quote.price ) {
						document.title = context.state.quote.price.longName + " (" + context.state.quote.price.symbol + ")";
					};
					
				} else { 
					//context.dispatch("error", response.data.errors[0] );
					document.title = "Quote not found";
				};
			})	.catch(error => {
				console.error(error); 
				document.title = "Quote not found"; 
			})			
		}
	
	}
	
}