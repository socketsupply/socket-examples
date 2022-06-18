//
//  ios_dns_devUITests.swift
//  ios-dns-devUITests
//
//  Created by Sergey Rubanov on 28.05.2022.
//

import XCTest

func isValidIp(s: String) -> Bool {
    let parts = s.split(separator: ".")
    let nums = parts.compactMap { Int($0) }
    return parts.count == 4 && nums.count == 4 && nums.filter { $0 >= 0 && $0 < 256}.count == 4
}

class ios_dns_devUITests: XCTestCase {

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testExample() throws {
        // UI tests must launch the application that they test.
        let app = XCUIApplication()
        app.launch()
        
        let webView = app.webViews.element(boundBy: 0);
        let input = webView.textFields.element(boundBy: 0)
        let result = webView.staticTexts.element(boundBy: 0)
        let button = webView.buttons["Submit"]
        
        button.tap()
        sleep(1)
        XCTAssertTrue(isValidIp(s: result.label))
        input.tap()
        input.typeText("lol")
        button.tap()
        XCTAssertEqual(result.label, "unknown node or service")

        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }

    func testLaunchPerformance() throws {
        if #available(macOS 10.15, iOS 13.0, tvOS 13.0, watchOS 7.0, *) {
            // This measures how long it takes to launch your application.
            measure(metrics: [XCTApplicationLaunchMetric()]) {
                XCUIApplication().launch()
            }
        }
    }
}
