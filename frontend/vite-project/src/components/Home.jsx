  import React, { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import axios from "axios";

  // Hero image
  const heroImage = 'https://www.bcmch.org/asset/uploads/common/880576991685bced34f30f.jpg';

  const Home = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ✅ Fetch departments
    useEffect(() => {
      const fetchDepartments = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/departments");

          if (response.data.success) {
            setDepartments(response.data.data); // ✅ [{_id, name}]
          } else {
            setError("Failed to fetch departments");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchDepartments();
    }, []);

    return (
      <div>
        {/* Hero Section */}
        <section className="text-center bg-light py-5">
          <div className="container">
            <h1 className="display-4">Welcome to Believers’ Hospital</h1>
            <p className="lead">
              Compassionate Care. Advanced Technology. Trusted Healthcare.
            </p>
            <img
              src={heroImage}
              alt="Believers Hospital"
              className="img-fluid rounded shadow my-3"
              style={{ maxHeight: '350px' }}
            />
          </div>
        </section>

        {/* About Section */}
        <section className="container my-5">
          <h2>About Believers’ Hospital</h2>
          <p>
            Believers’ Hospital is a premier healthcare institution in Thiruvalla, Kerala,
            dedicated to providing high-quality medical care with compassion.
          </p>
        </section>

        {/* ✅ Departments as Cards */}
        <section className="container my-5">
          <h2>Our Services</h2>

          {loading ? (
            <p>Loading departments...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <div className="row">
              {departments.map((dept) => (
                <div key={dept._id} className="col-md-4 mb-4">
                  
                  {/* ✅ Navigate using department ID */}
                  <Link
                    to={`/department/${dept._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card h-100 shadow-sm p-4 text-center hover-shadow">
                      <h5 className="card-title">{dept.name}</h5>
                    </div>
                  </Link>

                </div>
              ))}
            </div>
          )}
        </section>

        {/* Why Choose Us */}
        <section className="bg-light py-5">
          <div className="container">
            <h2>Why Choose Believers’ Hospital?</h2>
            <ul>
              <li>Experienced medical professionals</li>
              <li>Advanced treatment facilities</li>
              <li>Patient-centered care</li>
              <li>24/7 emergency services</li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className="container my-5">
          <h2>Get in Touch</h2>
          <p><strong>Phone:</strong> +91 469 260 2222</p>
          <p><strong>Email:</strong> info@bcmch.org</p>
          <p><strong>Address:</strong> Thiruvalla, Kerala</p>
        </section>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-3">
          &copy; {new Date().getFullYear()} Believers’ Hospital
        </footer>
      </div>
    );
  };

  export default Home;