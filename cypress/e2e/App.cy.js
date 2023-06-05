describe("Admin page", () => {
    it("should add new products", () => {
      cy.visit("http://localhost:3001/admin");
  
      cy.intercept("GET", "http://localhost:3000/products");
  
      cy.contains("button", "+").wait(1000).click();
  
      cy.get("input[name='name']").clear().type("My product");
      cy.get("input[name='imageUrl']").clear().type("https://randomicle.com/static/media/parcel.9f551831.png");
      cy.get("textarea[name='description']").clear().type("My product description");
      cy.get("input[name='price']").clear().type("99999.99");
  
      cy.contains("button", "Add product").wait(1000).click();
  
      cy.wait(1000); // Wait for 1 second
  
      cy.contains("My product"); // Verify that "My product" is present on the page
  
    });
  });
  